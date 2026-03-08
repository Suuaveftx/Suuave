'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import SearchBar from '../../../../components/Searchbar';
import CustomButton from '../../../../components/CustomButton';

const Messages = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Mobile state for selected chat
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    setChats([
      {
        id: 1,
        name: 'Tolu',
        message: 'Sure the collection is very.....',
        unread: false,
        img: '/dev-images/Avatar.png',
        time: '2 days ago', // ✅ added
      },
      {
        id: 2,
        name: 'Ciana',
        message: "We'd love your artistic interpret......",
        unread: true,
        img: '/dev-images/Artiste2.png',
        time: '1 day ago', // ✅ added
      },
      {
        id: 3,
        name: 'Tolu',
        message: 'That sounds super exciting! 5-7',
        unread: false,
        img: '/dev-images/Avatar.png',
        time: '2 days ago', // ✅ added
      },
    ]);
    setLoading(false);
  }, []);

  const filteredChats =
    selectedTab === 'unread' ? chats.filter((chat) => chat.unread) : chats;

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      console.log('Message Sent:', newMessage);
      setNewMessage('');
    }
  };

  if (loading) {
    return <p className='text-center py-4'>Loading messages...</p>;
  }

  return (
    <>
      {/* ✅ Desktop & Large Screens */}
      <div className='hidden lg:flex h-screen gap-6 p-6'>
        {/* Sidebar */}
        <div className='w-1/4 h-full bg-white p-4 border-r shadow-lg rounded-lg flex flex-col'>
          <h1 className='font-bold text-2xl mb-4'>Messages</h1>
          <SearchBar placeholder='Search chats' width='w-54' className='mb-4' />

          {/* Tabs */}
          <div className='flex gap-6 mb-4'>
            <button
              className={`text-left py-2 relative ${selectedTab === 'all' ? 'text-[#3A98BB] font-semibold' : 'text-gray-600'
                }`}
              onClick={() => setSelectedTab('all')}
            >
              All
              {selectedTab === 'all' && (
                <div className='absolute bottom-0 left-0 w-full h-[3px] bg-[#3A98BB]' />
              )}
            </button>
            <button
              className={`text-left py-2 relative ${selectedTab === 'unread'
                ? 'text-[#3A98BB] font-semibold'
                : 'text-gray-600'
                }`}
              onClick={() => setSelectedTab('unread')}
            >
              Unread
              {selectedTab === 'unread' && (
                <div className='absolute bottom-0 left-0 w-[40%] h-[3px] bg-[#3A98BB]' />
              )}
            </button>
          </div>

          {/* Chat List */}
          <div className='flex-1 overflow-y-auto'>
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer border-b ${chat.unread ? 'bg-gray-100' : ''
                  } hover:bg-gray-200`}
              >
                <Image
                  src={chat.img}
                  alt={chat.name}
                  className='w-12 h-12 rounded-full mr-3'
                  width={45}
                  height={45}
                />
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <h4 className='text-gray-800 font-semibold'>{chat.name}</h4>
                    {/* ✅ Time at far right */}
                    <span className='text-xs text-gray-400'>{chat.time}</span>
                  </div>
                  <p className='text-gray-500 text-xs truncate w-40'>{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className='flex flex-col flex-1 h-full bg-gray-100 rounded-md border border-[#D3D3D3]'>
          {/* Chat Header */}
          <div className='bg-white p-4 border-b shadow-md rounded-t-md font-bold text-center'>
            <h2 className='text-lg inline-block border-b border-gray-300'>Tolu Isioma</h2>
            <div className='mt-2'>
              <span className='text-[#878787] text-sm'>
                Modern Fashion Attire Illustration{' '}
                <span className='text-[#3A98BB]'>(24t64754)</span>
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className='flex-1 p-4 space-y-2 overflow-y-auto'>
            <div className='bg-[#CCE7F2] p-2 rounded-md text-[#222222] self-start w-96 ml-auto text-xs'>
              <div className='flex gap-2 justify-end font-bold'>
                <h4>Tolu</h4>
                <span className='text-[#767676]'>2 days ago</span>
              </div>
              Can you adjust te length of the whatever whatever to fit with the collar Can
              you adjust te length of the whatever whatever to fit with the colla
            </div>

            <div className='bg-[#EAEAEAEE] p-2 w-3/5 rounded-lg text-[#222222] text-xs self-end mr-auto'>
              <div className='flex gap-2 justify-start font-bold'>
                <h4>Ciana</h4>
                <span className='text-[#767676]'>2 days ago</span>
              </div>
              Can you adjust the length of the whatever whatever to fit with the collar
            </div>
          </div>

          {/* Input Area */}
          <div className='bg-white h-32 p-2 border-t rounded-b-md flex flex-col justify-between'>
            <textarea
              className='w-full h-16 !bg-white !text-black outline-none resize-none'
              placeholder='Type a message...'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className='flex items-center justify-between w-full'>
              <div className='flex gap-2'>
                <Image src='/dev-images/smile.png' alt='smile' width={15} height={15} />
                <Image
                  src='/dev-images/Attach3.png'
                  alt='attachment'
                  width={15}
                  height={15}
                />
                <Image
                  src='/dev-images/Picture.png'
                  alt='picture'
                  width={15}
                  height={15}
                />
                <Image
                  src='/dev-images/Mic.png'
                  alt='microphone'
                  width={15}
                  height={15}
                />
              </div>
              <CustomButton
                text='Send'
                className='bg-[#CCE7F2] text-[#222222]'
                icon={
                  <Image
                    src='/dev-images/Arrowside.png'
                    alt='arrow'
                    width={15}
                    height={15}
                  />
                }
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile View */}
      <div className='block lg:hidden h-screen flex-col bg-white'>
        {!activeChat ? (
          <>
            {/* Header */}
            <div className='flex items-center gap-2 p-4 border-b'>
              <FiChevronLeft
                className='text-xl cursor-pointer'
                onClick={() => router.push("/artist-page")}
              />
              <h1 className='font-bold text-lg'>Messages</h1>
            </div>

            {/* Search */}
            <div className='pt-2 px-4 pb-4 border-b mb-4'>
              <SearchBar placeholder='Search chats...' className='w-full' />
            </div>

            {/* Tabs */}
            <div className='flex justify-around border-b'>
              <button
                onClick={() => setSelectedTab('all')}
                className={`flex-1 py-2 font-medium ${selectedTab === 'all'
                  ? 'text-[#3A98BB] border-b-2 border-[#3A98BB]'
                  : 'text-gray-500'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab('unread')}
                className={`flex-1 py-2 font-medium ${selectedTab === 'unread'
                  ? 'text-[#3A98BB] border-b-2 border-[#3A98BB]'
                  : 'text-gray-500'
                  }`}
              >
                Unread
              </button>
            </div>

            {/* Chat List */}
            <div className='flex-1 overflow-y-auto'>
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)} // ✅ open chat on mobile
                  className={`flex items-center gap-3 p-4 border-b cursor-pointer ${chat.unread ? 'bg-gray-100' : ''
                    }`}
                >
                  <Image
                    src={chat.img}
                    alt={chat.name}
                    className='rounded-full'
                    width={45}
                    height={45}
                  />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-semibold text-sm'>{chat.name}</h4>
                      {/* ✅ Time at far right */}
                      <span className='text-xs text-gray-400'>{chat.time}</span>
                    </div>
                    <p className='text-xs text-gray-500 truncate w-40'>{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Mobile Active Chat */}
            <div className='flex items-center p-4 border-b relative'>
              <FiChevronLeft
                className='text-xl cursor-pointer absolute left-4 z-10'
                onClick={() => setActiveChat(null)} // ✅ close chat
              />
              <div className='flex flex-col items-center mx-auto'>
                <h1 className='font-bold text-lg'>{activeChat.name}</h1>
                <p className='text-xs text-gray-500'>
                  Modern Fashion Attire Illustration{' '}
                  <span className='text-[#3A98BB]'>(24t64754)</span>
                </p>
              </div>
            </div>

            {/* Messages */}
            {/* Messages */}
            <div className='flex-1 p-4 space-y-6 overflow-y-auto'>
              <div className='text-center text-[#767676] text-xs font-normal'>
                Tuesday, January 2025
              </div>

              {/* Sender */}
              <div className='bg-[#CCE7F2] p-3 rounded-md text-[#222222] text-sm w-4/5 ml-auto'>
                <div className='flex justify-end mb-1'>
                  <span className='text-[#767676] text-xs'>10:30 AM</span>
                </div>
                Can you adjust the length of the whatever whatever to fit with the collar
              </div>

              {/* Receiver */}
              <div className='bg-[#EAEAEA] p-3 rounded-md text-[#222222] text-sm w-4/5 mr-auto'>
                <div className='flex justify-end mb-1'>
                  <span className='text-[#767676] text-xs'>10:32 AM</span>
                </div>
                Yes, I can work on that and send you a draft later.
              </div>
            </div>

            {/* Input Area */}
            <div className='md:hidden flex items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2 m-2 shadow-sm mt-[450px]'>
              <div className='flex items-center gap-2 flex-1'>
                <Image src='/dev-images/smile.png' alt='smile' width={20} height={20} />
                <textarea
                  placeholder='Message'
                  className='flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent resize-none h-6'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-3 pl-3 border-l border-gray-200'>
                <Image
                  src='/dev-images/Attach3.png'
                  alt='attachment'
                  width={20}
                  height={20}
                />
                <Image
                  src='/dev-images/Picture.png'
                  alt='picture'
                  width={20}
                  height={20}
                />
                <Image
                  src='/dev-images/Mic.png'
                  alt='microphone'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Messages;
