import Loading from '@/components/loading';
import { dictionaryType } from '@/components/models/dictionary';
import {
  AddDictionaryItemMutation,
  GetDictionaryQuery,
} from '@/graphql/Dictionary/queries';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';

type Props = {};

export default function DictionaryAdmin({}: Props) {
  const { data: dictionaryData, loading, error } = useQuery(GetDictionaryQuery);
  const [foundDefs, setFoundDefs] = useState<dictionaryType[]>();
  const [search, setSearch] = useState('');
  const [newDictionaryItem, setNewDictionaryItem] = useState('');
  const [addDictionaryItem] = useMutation(AddDictionaryItemMutation, {
    refetchQueries: [
      {
        query: GetDictionaryQuery,
      },
    ],
  });

  useEffect(() => {
    const onPageLoad = () => {
      if (dictionaryData) {
        const dictionaryCopy = [...dictionaryData.Dictionary];
        setFoundDefs(dictionaryCopy);
      }
    };

    if (document.readyState === 'complete' && !loading) {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [dictionaryData, loading]);

  if (loading) return <Loading message='Dictionary' />;
  if (error) return <p>Oh no... {error.message}. Check if database is awake</p>;

  const { Dictionary } = dictionaryData;

  const filter = (event: { target: { value: string } }) => {
    const keyword = event.target.value;

    if (keyword !== '') {
      const results = Dictionary.filter((definition: { word: string }) => {
        return definition.word.toLowerCase().startsWith(keyword.toLowerCase());
      });

      setFoundDefs(results);
    } else {
      setFoundDefs(Dictionary);
    }

    setSearch(keyword);
  };

  const handleSubmitAddDictionaryItem = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    await addDictionaryItem({
      variables: {
        input: {
          word: newDictionaryItem,
          translation: '',
        },
      },
    });
    setNewDictionaryItem('');
  };

  return (
    <>
      <div className='w-1/2 mx-5 mt-20'>
        <p>
          Mic dicționar biblic
          <span className='text-xs ml-2'>
            (
            <Link
              className='hover:text-red-500'
              href='https://ardeleanlogos.wordpress.com/religia-crestina/dictionar-biblic-litera-a-z/'
              target='_blank'
            >
              sursă
            </Link>
            )
          </span>
        </p>
        <p className='text-xs'>
          Referințele sunt din biblie, în traducerea Cornilescu
        </p>

        <form onSubmit={handleSubmitAddDictionaryItem}>
          <div className='flex mt-2 mb-4 text-xs'>
            <input
              type='text'
              placeholder='Adăugare cuvânt ...'
              className='mx-2 border-2 w-full border-indian-khaki-400 dark:border-indian-khaki-200 rounded'
              value={newDictionaryItem}
              onChange={(e) => setNewDictionaryItem(e.target.value)}
            />
            <button type='submit' disabled={!newDictionaryItem}>
              {/* <PlusCircleSVG
                        color={newDictionaryItem ? '#766852' : '#D6C6AC'}
                      /> */}
            </button>
          </div>
        </form>

        <input
          name='search'
          id='searchInput'
          type='search'
          placeholder='Cuvânt care începe cu ...'
          value={search}
          onChange={filter}
          className='border block w-1/3 text-xs px-[10px] text-indian-khaki-900 bg-indian-khaki-50 dark:text-indian-khaki-50 dark:bg-indian-khaki-900 focus:outline-0 rounded-md mt-1'
        />

        <div className='mt-2'>
          <ol className='list-decimal list-outside marker:indian-khaki-800 mx-5'>
            {foundDefs && foundDefs.length > 0 ? (
              foundDefs.map((item) => (
                <li
                  key={item.id}
                  className='my-2 bg-indian-khaki-200 text-indian-khaki-900 dark:text-indian-khaki-200 dark:bg-indian-khaki-900'
                >
                  <div className='hover:underline'>
                    <Link
                      href={{
                        pathname: '/admin/dictionary/reference',
                        query: {
                          id: item.id,
                        },
                      }}
                      className='flex flex-row'
                    >
                      <div className='mx-2 text-sm'>{item.word}</div>
                      {item.translation && (
                        <div className='text-sm border-white dark:border-black px-2 border-l-2 '>
                          {item.translation}
                        </div>
                      )}
                      {item.explanation && (
                        <div className='text-sm border-white dark:border-black px-2 border-l-2'>
                          {item.explanation}
                        </div>
                      )}
                    </Link>
                  </div>
                </li>
              ))
            ) : (
              <p>Nu am găsit nimic 😞.</p>
            )}
          </ol>
        </div>
      </div>
    </>
  );
}
