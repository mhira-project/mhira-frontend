export interface UserUpdatePasswordInput {
  id: number;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface UserChangePasswordInput {
  currentPassword: number;
  newPassword: string;
  newPasswordConfirmation: string;
}
