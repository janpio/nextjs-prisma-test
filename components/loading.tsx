import React from 'react';

type Props = {
  message: string;
};

export default function Loading({ message }: Props) {
  return (
    <div className='text-center pt-8'>
      <p className='text-blu-400 pb-5 animate-pulse'>Loading {message}...</p>

      <div role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
}
