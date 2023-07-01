/* eslint-disable eol-last */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */

import { toast } from 'react-toastify'
import { api } from './api'

export const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        const matchedChildNode = node.children.find(element => element.key === key)
        parentKey = matchedChildNode.title + ' > ' + node.title
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children) + ' > ' + node.title
      }
    }
  }

  return parentKey
}

export const getParentKeyInRootNodes = (key, tree) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.key === key) {
      return node.title
    }
  }
}

export const getTitleFromTabs = (key, tree) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.key === key) {
      return node.label
    }
  }
}

export const getBreadCrumbs = (keys, tree) => {
  const breadCrumPath: string[] = []
  let reversedStringAfterSplitting = ''
  for (let i = 0; i < keys.length; i++) {
    const title = getParentKey(keys[i], tree)
    if (title === undefined) {
      const parentKeyInRoot = getParentKeyInRootNodes(keys[i], tree)
      breadCrumPath.push(parentKeyInRoot)
    } else {
      const splitByGreaterThan = title.split('>')
      for (let i = splitByGreaterThan.length - 1; i >= 0; i--) {
        reversedStringAfterSplitting += splitByGreaterThan[i] + ' > '
      }
      const stringAfterRemovedGreaterSymbolAtLast = reversedStringAfterSplitting = reversedStringAfterSplitting.substring(0, reversedStringAfterSplitting.length - 1)
      breadCrumPath.push(stringAfterRemovedGreaterSymbolAtLast)
    }
  }
  return breadCrumPath
}
export const retriveMainProfessionalList = async (path: string, fileName: string) => {
  const response = await api.get(`auth/${path}/${fileName}`)
  const temp = await response.data
  return temp
}

export const removeSpaceAndSpecialCharacters = async (label: string) => {
  const newLabelPath = label.replace(/\s+/g, '').toLowerCase()
  const mainLablePath = newLabelPath.replace('/', '').toLocaleLowerCase()
  return mainLablePath
}

export const toastify = async (sentenceToDisplay: string) => {
  toast.success(sentenceToDisplay, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  })
}

export const errorToastify = async (sentenceToDisplay: string) => {
  toast.error(sentenceToDisplay, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  })
}

export const setPreference = {
  setPrefernce: (preference: string) => {
    return preference
  }
}

export const getPreference = {
  getSelectedPreference: () => {
    const preference = setPreference.setPrefernce
    if (preference) {
      return preference
    }
  }
}
export const tabs = (label: string) => {
  const replaceTitleToLabel = label.replaceAll('title', 'label')
  const afterReplacedFromTitleToLabel = JSON.parse(replaceTitleToLabel)
  return afterReplacedFromTitleToLabel
}

export const returnUniqueData = async (data: any) => {
  const uniqueIds: any = [];
  const unique = data.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);
    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    }
    return false;
  });
  return unique
}

export const retriveImageUrls = async (name) => {
  const items: any = []
  for (let i = 0; i < name.length; i++) {
    const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
    items.push(movies.request.responseURL)
  }
  return items
}