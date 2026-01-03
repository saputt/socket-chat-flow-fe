import React from 'react'

const PrivChat = () => {
  return (
    <form>
        {/* detail room */}
        <div className='flex bg-gray-200 px-5 py-3 gap-3'>
            {/* image room */}
            <div className='w-7 bg-white aspect-square rounded-full'></div>
            {/* detail room info */}
            <div>
            <p></p>
            </div>
        </div>

        {/* chat area */}
        <div className='h-150 bg-gray-50 overflow-y-auto flex flex-col gap-5 py-7'>
            
        </div>

        {/* input area */}
        <div className='w-full bg-gray-200 flex py-1 px-3 gap-2'>
            <Input
            className='flex-1'
            // onChange={(e) => setContent(e.target.value)}
            // value={content}
            />
            <Button>Send</Button>
        </div>
    </form>
  )
}

export default PrivChat