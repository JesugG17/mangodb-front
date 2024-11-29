export async function loginUser(email: string, password: string) {
  // This is a mock function. In a real app, you'd call your API here.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password123') {
        resolve({ success: true });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
}
