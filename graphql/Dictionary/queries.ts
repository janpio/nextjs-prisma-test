import { gql } from '@apollo/client';

export const GetDictionaryQuery = gql`
  query GetDictionary {
    Dictionary {
      id
      word
      translation
      explanation
    }
  }
`;

export const GetDictionaryItemQuery = gql`
  query GetDictionaryItem($id: Int!) {
    DictionaryItem(id: $id) {
      id
      word
      translation
      explanation
    }
  }
`;

export const AddDictionaryItemMutation = gql`
  mutation AddDictionaryItem($input: DictionaryInput!) {
    addDictionaryItem(input: $input) {
      id
    }
  }
`;

export const DeleteDictionaryItemMutation = gql`
  mutation DeleteDictionaryItem($id: Int!) {
    deleteDictionaryItem(id: $id) {
      id
    }
  }
`;

export const UpdateDictionaryItemNameMutation = gql`
  mutation UpdateDictionaryItemName($id: Int!, $word: String!) {
    updateDictionaryItemName(id: $id, word: $word) {
      id
      word
      translation
      explanation
    }
  }
`;

export const UpdateDictionaryItemTranslationMutation = gql`
  mutation UpdateDictionaryItemTranslation($id: Int!, $translation: String!) {
    updateDictionaryItemTranslation(id: $id, translation: $translation) {
      id
      word
      translation
      explanation
    }
  }
`;

export const UpdateDictionaryItemExplanationMutation = gql`
  mutation UpdateDictionaryItemExplanation($id: Int!, $explanation: String!) {
    updateDictionaryItemExplanation(id: $id, explanation: $explanation) {
      id
      word
      translation
      explanation
    }
  }
`;
