export interface UserUpdatePasswordInput {
  id: number;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface UserChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
