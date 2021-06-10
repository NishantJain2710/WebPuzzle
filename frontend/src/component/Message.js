import React from 'react'
import Cancel from '../assets/icons/iconfinder_cross_214654.svg'
import Cross from '../assets/icons/iconfinder_Close_Icon_Dark_1398917.svg'
import Tick from '../assets/icons/iconfinder_check_6586148.svg'
import Info from '../assets/icons/iconfinder_Info_728979.svg'

const Message = ({variant, children}) => {
    var bgColor =  ''
    var color = ''
    var logo = ''
    if(variant==='Danger'){
        bgColor = 'rgba(145, 49, 49, 0.733'
        color = '#f7f5f5'
        logo = Cross
    }else if(variant==='Success'){
        bgColor = 'rgba(45, 197, 45, 0.726)'
        color = '#f7f5f5'
        logo = Tick
    }else if(variant ==='Info'){
        bgColor = '#99a17a9f'
        color = '#f7f5f5'
        logo = Info
    }
    const crossBtnHandler = (e) =>{
        e.preventDefault()
        document.getElementById('alert').style.display = 'none';
    }
    return (
            <div className='alert' id ='alert'>
                <div className='alert-header' style={{backgroundColor:bgColor, color:color}}>
                    <h4 style={{color:color}}>{variant === 'Danger' ? 'Error, Something went worng' : variant}</h4>
                    <button onClick={crossBtnHandler}> <img src={Cancel} alt="cancel" className='alert-cross-btn'/></button>
                </div>
                <img src={logo} alt='Alert-Logo' className='alert-logo'/>
                <p style={{color:'#f7f5f5'}}>{children}</p>
            </div>
    )
}

Message.defaultProps = {
    variant: 'Info'
}

export default Message