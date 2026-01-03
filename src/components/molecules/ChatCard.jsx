import Card from '../atoms/Card'

const ChatCard = ({chatName, onClick}) => {
  return (
    <Card
        className='flex gap-5 px-10 py-2 shadow-md cursor-pointer w-80'
        onClick={onClick}
    >
        <div className='bg-amber-200 rounded-full w-10 aspect-square'/>
        <p>
            {chatName}
        </p>
    </Card>
  )
}

export default ChatCard