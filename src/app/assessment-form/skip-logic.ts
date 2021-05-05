import { Answer } from './@types/answer';
import { Question, QuestionType } from './@types/question';

const CONDITIONALS = ['=', 'OR', 'AND', 'selected'] as const;

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

type Conditional = ElementType<typeof CONDITIONALS>;

interface AnsweredQuestion {
  question: Question;
  answer: Answer;
}

interface ConditionalInfo {
  conditional: Conditional;
  index: number;
}

interface ConditionInfo {
  condition: string;
  conditional: Conditional;
}

export class SkipLogic {
  public static create(question: Question, questions: Question[], answers: Answer[]) {
    let logic = question.relevant;

    console.log('create skiplogic for', question.name, logic);

    const relevantQuestions: AnsweredQuestion[] = SkipLogic.extractQuestions(logic, questions).map((q) => ({
      question: q,
      answer: answers.find((a) => a.question === q._id),
    }));

    console.log('relevant', relevantQuestions);

    const firstCondition = SkipLogic.extractFirstCondition(logic);
    const state = SkipLogic.solveCondition(firstCondition, relevantQuestions);
    console.log('first solve', state, firstCondition);
  }

  private static solveCondition(condition: ConditionInfo, relevantQuestions: AnsweredQuestion[]): boolean {
    switch (condition.conditional) {
      case '=':
        const [p1, p2] = condition.condition.split(condition.conditional).map((p) => p.trim());
        console.log('found parts', p1, p2);
        return SkipLogic.compareValues(
          SkipLogic.extractValue(p1, relevantQuestions),
          SkipLogic.extractValue(p2, relevantQuestions)
        );
    }
  }

  private static compareValues(p1: any, p2: any): boolean {
    console.log('found values', p1, p2);
    return p1 == p2;
  }

  private static extractValue(item: string, relevantQuestions: AnsweredQuestion[]): any {
    // is question
    const questionName = item.match(/\$\{([^}]+)\}/)?.[1];
    if (questionName) {
      const rq = relevantQuestions.find((rq) => rq.question.name === questionName);
      return SkipLogic.extractAnswerFromType(rq.question.type, rq.answer);
    }

    // is value
    // TODO: improve this
    return item.substr(1, item.length - 2);
  }

  private static extractAnswerFromType(type: QuestionType, answer: Answer) {
    switch (type) {
      case QuestionType.CHECKBOX:
        return answer.booleanValue;
      case QuestionType.DATE:
        return answer.dateValue;
      case QuestionType.DATETIME:
        return { date: answer.dateValue, time: answer.textValue };
      case QuestionType.DECIMAL:
      case QuestionType.INTEGER:
        return answer.numberValue;
      case QuestionType.SELECT_ONE:
      case QuestionType.TEXT:
      case QuestionType.TIME:
        return answer.textValue;
      case QuestionType.SELECT_MULTIPLE:
        return answer.multipleChoiceValue;
      default:
        return null;
    }
  }

  private static extractQuestions(logic: string, availableQuestions: Question[]): Question[] {
    return [...new Set([...logic.matchAll(/\$\{([^}]+)\}/gm)].map((match) => match[1]))].map((name) =>
      availableQuestions.find((q) => q.name === name)
    );
  }

  private static extractFirstCondition(logic: string): ConditionInfo | null {
    const firstConditional = SkipLogic.findFirstConditional(logic);

    if (!firstConditional) {
      console.log('NOT FOUND ANY CONDITION FOR', logic);
      return null;
    }

    console.log('first condition', firstConditional);
    const nextConditionalIdx = this.findFirstConditional(
      logic.substr(firstConditional.index + firstConditional.conditional.length)
    );
    nextConditionalIdx.index += firstConditional.index + firstConditional.conditional.length;

    console.log('next', nextConditionalIdx);

    const condition = nextConditionalIdx ? logic.substr(0, nextConditionalIdx.index) : logic;

    console.log('condition', condition);

    return { condition, conditional: firstConditional.conditional };
  }

  private static findFirstConditional(logic: string): ConditionalInfo {
    return CONDITIONALS.map((c) => ({ conditional: c, index: logic.toLowerCase().indexOf(c.toLowerCase()) }))
      .filter((info) => info.index >= 0)
      .sort((prev, next) => prev.index - next.index)?.[0];
  }
}
