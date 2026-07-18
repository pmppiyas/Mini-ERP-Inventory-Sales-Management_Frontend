interface EnvConfig {
  VITE_BACKEND_URL: string;

  VITE_ADMIN_EMAIL: string;
  VITE_ADMIN_PASS: string;

  VITE_MANAGER_EMAIL: string;
  VITE_MANAGER_PASS: string;

  VITE_EMPLOYEE_EMAIL: string;
  VITE_EMPLOYEE_PASS: string;
}

const loadEnvVars = (): EnvConfig => {
  const requiredEnvVars: string[] = [
    'VITE_BACKEND_URL',

    'VITE_ADMIN_EMAIL',
    'VITE_ADMIN_PASS',

    'VITE_MANAGER_EMAIL',
    'VITE_MANAGER_PASS',

    'VITE_EMPLOYEE_EMAIL',
    'VITE_EMPLOYEE_PASS',
  ];

  requiredEnvVars.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required env variable: ${key}`);
    }
  });

  return {
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string,

    VITE_ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL as string,
    VITE_ADMIN_PASS: import.meta.env.VITE_ADMIN_PASS as string,

    VITE_MANAGER_EMAIL: import.meta.env.VITE_MANAGER_EMAIL as string,
    VITE_MANAGER_PASS: import.meta.env.VITE_MANAGER_PASS as string,

    VITE_EMPLOYEE_EMAIL: import.meta.env.VITE_EMPLOYEE_EMAIL as string,
    VITE_EMPLOYEE_PASS: import.meta.env.VITE_EMPLOYEE_PASS as string,
  };
};

export const ENV = loadEnvVars();
