import React, {useState} from 'react';
import { Input } from '../../components';
import registerImage from '../../assets/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx@3x.png';
import { useNavigate } from 'react-router-dom';
import { makeRequestAuth } from '../../utils/makeRequest';
import { POST_USER_LOGIN } from '../../constants/apiEndPoints';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async()=>{
    const registerData = {
      email,
      password
    };
    console.log(registerData);
    makeRequestAuth(POST_USER_LOGIN,{
      data: registerData
    }).then((data)=>{
      localStorage.setItem('token', data.data.token);
      navigate('/content-types');
    }).catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    });
  };
  return (
    <div className='w-100 h-100 flex'>
      <div className='w-3/5 bg-[#eceeff] h-screen flex justify-center items-center'>
        <p></p>
        <div className='flex justify-center items-center'>
          <img src={registerImage} alt="search" className='w-3/5'/>
        </div>
      </div>
      <div className='w-2/5 bg-[#272727] h-screen p-40'>
        <p className='text-white text-3xl font-bold mb-10'>Login to your CMS+ account</p>
        <div className='p-10'>
          <Input name='Email' value={email} setValue={setEmail}/>
          <Input name='Password' value={password} setValue={setPassword} type='password'/>
          <button className='w-full bg-gradient-to-r my-5 py-2 from-[#946afe] to-[#643dff] rounded-md text-white' onClick={handleRegister}>Login</button>
          <p className='text-white underline text-sm'>Forgot password?</p>
          <button className='text-white underline text-sm' onClick={()=>navigate('/register')}>Dont have an account?</button>
          <p className='text-red-500'>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
