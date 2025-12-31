import React from 'react'
import SearchBar from '../molecules/SearchBar'
import Button from '../atoms/Button'
import useAuthStore from '../../store/useAuthStore'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {accessToken, user} = useAuthStore.getState()
  return (
    <div className='flex justify-between px-5 py-2 items-center bg-white'>
        <Link 
            className='text-xl font-semibold'
            to={'/'}
        >
            Kolaa
        </Link>
        <SearchBar
            className=""
        />
        {!accessToken ? (
            <Link to={'/login'}>
                <Button className='' >Login</Button>
            </Link>
        ) : (
            !   user?.role.includes("SELLER") && (
                <Button>Jadi seller</Button>
            )
        )}
    </div>
  )
}

export default Navbar