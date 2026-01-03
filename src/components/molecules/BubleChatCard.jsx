import React from 'react'

const BubleChatCard = ({content, className, senderName=null}) => {
  return (
    <div className={`${className}`}>
        <div className='flex flex-col gap-1'>
            {senderName && <p className={`text-xs font-light ${senderName == "Anda" && 'text-right'}`}>{senderName}</p>}
            <div className='bg-white shadow-sm px-4 py-2 rounded-md w-fit'>
                {content}
            </div>
        </div>
    </div>
  )
}

export default BubleChatCard