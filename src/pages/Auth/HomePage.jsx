import React from 'react'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
   
    
    <div className='h-[70vh] text-center flex flex-col py-6'>
        <span className='text-4xl text-blue-600  '>Comming Soon ................</span>
        <div className='py-6 space-x-2'>
            <Link to="/signup">
            
  <Button className="text-red-600 bg-blue-300">
            Sign up
        </Button>
        </Link>
          <Link to="/reset-password">
        <Button className="text-red-600 bg-amber-500">
           Reset Password
        </Button>
        </Link>
          <Link to="/login">
        <Button className="text-red-100 bg-orange-600">
           Login
        </Button>
        </Link>
         <Link to="/forgot-password">
         <Button className="text-red-600 ">
           Forgot Password
        </Button>
         </Link>
        
        </div>
      
    </div>

   
  )
}
