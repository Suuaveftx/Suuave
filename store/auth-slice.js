export const authSlice = (set) => ({
  requestForgotPasswordEmail: '',
  resetPasswordOTP: '',
  setRequestForgotPasswordEmail: (email) => set({ requestForgotPasswordEmail: email }),
  setResetPasswordOTP: (otp) => set({ resetPasswordOTP: otp }),
});
