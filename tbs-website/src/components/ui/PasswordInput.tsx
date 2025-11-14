'use client'

import { useState } from 'react'

export default function PasswordInput({ id, name, required }: { id: string, name: string, required?: boolean }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input id={id} name={name} type={show ? 'text' : 'password'} className="w-full border rounded px-3 py-2 pr-12" required={required} />
      <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary">{show ? 'Hide' : 'Show'}</button>
    </div>
  )
}
