import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import brandLogo from '../assets/BrandLogo/Group 1@2x.png'
import {logout} from '../actions/userActions'



const Header = () => {

    const dispatch = useDispatch()


    const userLogin = useSelector((state)=> state.userLogin)
    const{userInfo} = userLogin


    const logoutHandler = (e) =>{
        e.preventDefault()
        dispatch(logout())
    }


    return (
        <header>
            <div className='psudo-nav'>

            </div>
            <nav id="nav">
                <div id="logo">
                    <Link to='/'> <img src={brandLogo} alt="Apeejay Stya University" /></Link>
                </div>
                {userInfo && 
                <div className="nav-links dropDown" >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="113.607" height="120.707" viewBox="0 0 113.607 120.707" fill="#464646">
                                <g id="iconfinder_user_account_profile_5402435" transform="translate(-4 -4)">
                                    <circle id="Ellipse_1" data-name="Ellipse 1" cx="28.5" cy="28.5" r="28.5" transform="translate(32 4)" />
                                    <path id="Path_1" data-name="Path 1" d="M117.607,55.6v7.1a7.1,7.1,0,0,1-7.1,7.1H11.1A7.1,7.1,0,0,1,4,62.7V55.6A42.6,42.6,0,0,1,46.6,13H75A42.6,42.6,0,0,1,117.607,55.6Z" transform="translate(0 54.904)"/>
                                </g>
                            </svg>
                            {userInfo.name}
                        </div>  
                        <div className='dropDown-content'>
                            {(userInfo && userInfo.isOrganizer) && <div>
                                <Link to='/addQuestions' >Add Question</Link>
                                <Link to='/showQuestions' >Show Questions</Link>
                                <Link to='/Register' >Add User</Link>
                            </div>}
                            <button onClick={logoutHandler}>Logout</button>
                        </div>
                </div>
                }
            </nav>
        </header>
    )
}

export default Header
