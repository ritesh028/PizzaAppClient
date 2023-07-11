import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImage from '../img/logo.png';
import cartImage from '../img/cart.png';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/UserSlice'
import { deleteAll } from '../redux/slices/CartSlice'
const Navbar = () => {
    // Logic to fetch token from the cookie will come here
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function clickHandler() {
        const payload = {
            isLoggedIn: false,
            token: ''
        }
        dispatch(logout())
        dispatch(deleteAll())
        toast.success('User logged out successfully')
        navigate('/login')
    }
    const cart = useSelector((state) => state.cart)
    const isloggedIn = useSelector((state) => state.user.isLoggedIn)
    const totalQty = cart.reduce((accumulator, current) => {
        return accumulator + current.qty
    }, 0)
    return (
        <nav className="container mx-auto flex items-center justify-between py-4">
            <div>
                <NavLink to="/">
                    <img src={logoImage} alt="logo" />
                </NavLink>
            </div>
            <div>
                <ul className="flex items-center">
                    <li className="ml-6">
                        <NavLink to="/">Menu</NavLink>
                    </li>
                    {isloggedIn ? (
                        <li className="ml-6">
                            <button
                                onClick={clickHandler}
                                className="cursor-pointer"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li className="ml-6">
                                <NavLink to="/register">Register</NavLink>
                            </li>
                            <li className="ml-6">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </>
                    )}
                    <li className="ml-6">
                        <NavLink to="/cart" className="px-4 py-2 rounded-full flex items-center bg-orange-500">
                            {
                                totalQty > 0 &&
                                <span id="cartCounter" className="text-white font-bold pr-2">
                                    {totalQty}
                                </span>
                            }
                            <img src={cartImage} alt="" />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
