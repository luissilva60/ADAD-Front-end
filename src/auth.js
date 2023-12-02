import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';
import { useCookies, CookiesProvider } from 'react-cookie'; // Import useCookies from react-cookie

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });


export function authenticate() {
  showConnect({
    appDetails: {
      name: 'ADAD Project',
      icon: window.location.origin + '/logo512.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    onCancel: () => {
      console.log('cancelled');
    },
    userSession: userSession,
  });
}
export async function login(email, password) {

  try {
    const response = await fetch('https://api-adad-e27e767b86bc.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Assuming the API returns a token upon successful login
    const data = await response.json();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log('Login successful:', data);
    return data;





  } catch (error) {
    console.error('Login error:', error);
    // Handle login error as needed
  }
}






export function getUserData() {
  return userSession.loadUserData();
}


export async function verifyToken(token) {
  console.log(token)
  try {
    const response = await fetch('https://api-adad-e27e767b86bc.herokuapp.com/users/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (!response.ok) {
      console.log("Server Error")
      return { isValid: false, message: 'Server Error' };
    }


    const data = await response.json();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log('Verification:', data);
    return data;





  } catch (error) {
    console.error('Login error:', error);
    // Handle login error as needed
  }
}

export function getPerson() {
  return new Person(getUserData().profile);
}