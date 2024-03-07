"use client"

import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { untrackProductByEmail } from '@/lib/actions'

interface Props {
  productId: string
}

const UntrackModal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try{
        await untrackProductByEmail(productId, email);

    setIsSubmitting(false)
    setEmail('')
    closeModal()
    }
    catch(error){
        console.log("Failed to untrack the product",error);
        setIsSubmitting(false);
    }
    
  }

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Untrack
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" /> 
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
            
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <h2 className="dialog-head_text">
                      Untrack Product
                    </h2>

                    <button
                      className="text-red-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>

                  <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="dialog-input_container">
                      <input 
                        required
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className='dialog-input'
                      />
                    </div>

                    <button 
                      type="submit"
                      className="btn" // Use the same class as the track button
                    >
                      {isSubmitting ? 'Untracking...' : 'Untrack'}
                    </button>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UntrackModal
