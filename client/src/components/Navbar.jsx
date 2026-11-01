import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const navigate = useNavigate()
    const location = useLocation()

    const { setShowRecruiterLogin, companyToken, companyData, setCompanyToken, setCompanyData } = useContext(AppContext)

    const isHomePage = location.pathname === '/'

    // Function to logout for company
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <div className='flex flex-col items-start'>
                    <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
                    {!isHomePage && (
                        <button onClick={() => navigate('/')} className='flex items-center gap-1 mt-1 text-sm text-gray-600 hover:text-blue-600 transition-colors'>
                            <img className='w-4 h-4' src={assets.back_arrow_icon} alt="" />
                            <span className='max-sm:hidden'>Back to Home</span>
                        </button>
                    )}
                </div>
                {
                    user
                        ? <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                        : companyToken
                            ? <div className='flex items-center gap-3'>
                                <Link to={'/dashboard'} className='text-gray-600 hover:text-blue-600'>Dashboard</Link>
                                <p>|</p>
                                {companyData && <p className='max-sm:hidden'>Welcome, {companyData.name}</p>}
                                <button onClick={logout} className='text-gray-600 hover:text-red-500 text-sm'>Logout</button>
                            </div>
                            : <div className='flex gap-4 max-sm:text-xs'>
                                <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                                <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                            </div>
                }

            </div>
        </div>
    )
}

export default Navbar