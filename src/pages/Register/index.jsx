import React, {useState} from 'react';
import { Input } from '../../components';
import registerImage from '../../assets/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx@3x.png';
import { useNavigate } from 'react-router-dom';
import { makeRequestAuth } from '../../utils/makeRequest';
import { POST_USER_REGISTER } from '../../constants/apiEndPoints';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async()=>{
    if(password !== repassword){
      return alert('Password and Re-Enter Password must be same');
    }
    const registerData = {
      email,
      password
    };
    console.log(registerData);
    makeRequestAuth(POST_USER_REGISTER,{
      data: registerData
    }).then(()=>{
      navigate('/login');
    }).catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
      // window.reload();
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
        <p className='text-white text-3xl font-bold mb-10'>Register to your CMS+ account</p>
        <div className='p-10'>
          <Input name='Email' value={email} setValue={setEmail}/>
          <Input name='Password' value={password} setValue={setPassword} type='password'/>
          <Input name='Re-Enter Password' value={repassword} setValue={setRepassword} type='password'/>
          <button className='w-full bg-gradient-to-r my-5 py-2 from-[#946afe] to-[#643dff] rounded-md text-white' onClick={handleRegister}>Register</button>
          <p className='text-white underline text-sm'>Forgot password?</p>
          <p className='text-red-500'>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
