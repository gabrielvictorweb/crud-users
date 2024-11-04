export interface MeProps {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  cpf: string;
  email: string;
}

export interface UserUpdateRequest {
  name: string;
  email: string;
  phoneNumber: string;
}
