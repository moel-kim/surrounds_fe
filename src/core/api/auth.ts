import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { ToastError, ToastWarn } from '@src/utils/toast';

export type ValidateResult = {
  email: string;
  username: string;
  profile_image: string;
};

export type SignInResult = ValidateResult & {
  access_token: string;
};

export const apiValidate = async () => {
  try {
    // const { data } = await axios.get<ValidateResult>('/auth');
    // return data;
    return {
      email: 'test@test.com',
      username: 'test',
      profile_image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
  } catch (err) {
    ToastError('error occured during validation process');
    throw err;
  }
};

export const apiKakaoSignIn = async ({ access_token }: { access_token: string }) => {
  try {
    // const { data } = await axios.post<SignInResult>('/auth/signin/kakao', {
    //   access_token,
    // });
    // setClientAuthToken(data.access_token);
    // return data;
    return {
      email: 'test@test.com',
      username: 'test',
      profile_image: 'https://via.placeholder.com/150',
    };
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('error occured during kakao signin process');
      throw err;
    }
  }
};
