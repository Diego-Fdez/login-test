import { render, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DisplayFormValues, LoginForm } from '../pages';
import { LoginFormMock, LoginFormMockError } from '../_mocks_/LoginForm.mock';
import axios from 'axios';

jest.mock('axios');
jest.mock(
  '../pages/Login/components/DisplayFormValues/DisplayFormValues.jsx',
  () => ({
    __esModule: true,
    default: () => <div>Mocked DisplayFormValues</div>,
  })
);

describe('LoginForm', () => {
  afterEach(cleanup); // limpia después de cada test
  afterEach(jest.clearAllMocks); //reinicia cada test

  //rendering el componente
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: LoginFormMock });
    render(<LoginForm />);
  }); //antes de cada test hace esto

  //verifica que exista en el componente
  it('should two input and button exists at the screen', () => {
    const userNameInput = screen.getByRole('textbox', { name: /userName/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const submitButton = screen.getByRole('button', /Login/i);

    //revisa que exista en el DOM
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //revisa el valor
    expect(userNameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button if the form values are valid', async () => {
    const userNameInput = screen.getByRole('textbox', { name: /userName/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const submitButton = screen.getByRole('button', { name: /Login/i });

    await userEvent.type(userNameInput, LoginFormMock.userName);
    await userEvent.type(passwordInput, LoginFormMock.password);

    await waitFor(() => {
      expect(userNameInput).toHaveValue(LoginFormMock.userName);
      expect(passwordInput).toHaveValue(LoginFormMock.password);
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should disabled the submit button if the form values are invalid', async () => {
    const userNameInput = screen.getByRole('textbox', { name: /userName/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const submitButton = screen.getByRole('button', { name: /Login/i });

    await userEvent.type(userNameInput, LoginFormMockError.userName);
    await userEvent.type(passwordInput, LoginFormMockError.password);

    /* Waiting for the value to be changed. */
    await waitFor(() => {
      expect(userNameInput).toHaveValue(LoginFormMockError.userName);
      expect(passwordInput).toHaveValue(LoginFormMockError.password);
      // expect(
      //   screen.getByText(/the username cannot be longer than 12 characters/i)
      // ).toBeInTheDocument();
      // expect(
      //   screen.getByText(
      //     'the password must be alphanumeric, and contain a maximum of 12 characters, one uppercase and one special character'
      //   )
      // ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  it('should call the onSubmit function when the submit button is clicked', async () => {
    const userNameInput = screen.getByRole('textbox', { name: /userName/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const submitButton = screen.getByRole('button', { name: /Login/i });

    await userEvent.type(userNameInput, LoginFormMock.userName);
    await userEvent.type(passwordInput, LoginFormMock.password);

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it('should mock DisplayFormValues', () => {
    expect(screen.getByText('Mocked DisplayFormValues')).toBeInTheDocument();
  });
});
