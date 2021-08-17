import React from 'react';

const AuthForm = () => {
  return <form>
      <div className='form-group'>
          <input type='text' className='form-contol' placeholder="Логин"></input>
          <input type='text' className='form-contol' placeholder="Пароль"></input>
      </div>
  </form>
};

export default AuthForm;