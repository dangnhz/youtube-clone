
const headerConfig = (token) => {
    // Headers
    const config =  {
      headers: {
        'Content-type': 'application/json'
      }
    };
    config.headers['x-auth-token'] = token;
    return config;
  };

  export default headerConfig
