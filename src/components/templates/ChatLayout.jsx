

const ChatLayout = ({children}) => {

  return (
    <div className='mt-10'>
        <div className='m-auto w-200 bg-white rounded-sm shadow-md overflow-hidden'>
          {children}
        </div>
    </div>
  )
}

export default ChatLayout