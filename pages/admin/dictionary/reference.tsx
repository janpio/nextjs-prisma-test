import Loading from '@/components/loading';
// import CheckCircleSVG from '@/components/svg/checkCircle-svg';
// import MinusCircleSVG from '@/components/svg/minusCircle-svg';
import {
  DeleteDictionaryItemMutation,
  GetDictionaryItemQuery,
  GetDictionaryQuery,
  UpdateDictionaryItemExplanationMutation,
  UpdateDictionaryItemNameMutation,
  UpdateDictionaryItemTranslationMutation,
} from '@/graphql/Dictionary/queries';
import DoNotEnter from '@/pages/doNotEnter';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

type Props = {};

export default function Reference({}: Props) {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const {
    data: dictionaryData,
    loading,
    error,
  } = useQuery(GetDictionaryItemQuery, {
    variables: { id: +router.query.id! },
  });
  const [updatedName, setUpdatedName] = useState('');
  const [updatedTranslation, setUpdatedTranslation] = useState('');
  const [updatedExplanation, setUpdatedExplanation] = useState('');
  const [deleteDictionaryItem] = useMutation(DeleteDictionaryItemMutation, {
    refetchQueries: [
      {
        query: GetDictionaryQuery,
      },
    ],
  });
  const [updateDictionaryItemName] = useMutation(
    UpdateDictionaryItemNameMutation,
  );
  const [updateDictionaryItemTranslation] = useMutation(
    UpdateDictionaryItemTranslationMutation,
  );
  const [updateDictionaryItemExplanation] = useMutation(
    UpdateDictionaryItemExplanationMutation,
  );

  if (loading || status === 'loading')
    return <Loading message={'DictionaryItem #' + router.query.id} />;
  if (error) return <p>Oh no... {error.message}. Check if database is awake</p>;

  const { DictionaryItem } = dictionaryData;

  const handleSubmitDeleteDictionaryItem = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    await deleteDictionaryItem({
      variables: {
        id: +router.query.id!,
      },
    });
    router.back();
  };

  const handleSubmitUpdateDictionaryItemName = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    await updateDictionaryItemName({
      variables: {
        id: +router.query.id!,
        name: updatedName,
      },
    });
    setUpdatedName('');
  };

  const handleSubmitUpdateDictionaryItemTranslation = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    await updateDictionaryItemTranslation({
      variables: {
        id: +router.query.id!,
        translation: updatedTranslation,
      },
    });
    setUpdatedTranslation('');
  };

  const handleSubmitUpdateDictionaryItemExplanation = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    await updateDictionaryItemExplanation({
      variables: {
        id: +router.query.id!,
        explanation: updatedExplanation,
      },
    });
    setUpdatedExplanation('');
  };

  return (
    <>
      {
      }
    </>
  );
}
