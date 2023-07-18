/* eslint-disable no-undef */
import { Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSisternode, AiOutlineSubnode, AiOutlineForm } from 'react-icons/ai'
import { BiCheck } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'
import './styles.css'
import { MdDelete } from 'react-icons/md'
import { RiPencilFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import { EditableAntdTreeNode } from './EditableAntdTree'
import { TextInput } from './TextInput'
import { deleteTreeNode } from './utils'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { BinaryTree } from 'tabler-icons-react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

type EditableTreeTitleProps = {
  treeData: EditableAntdTreeNode[];
  setTreeData: React.Dispatch<React.SetStateAction<EditableAntdTreeNode[]>>;
  expandKey: Function;
  source: string;
  node: EditableAntdTreeNode;
  deleteNode?: {
    caption?: string;
    disable?: boolean | ((node: EditableAntdTreeNode) => boolean | undefined);
    event?: (node: EditableAntdTreeNode) => void;
  };
  updateNode?: {
    caption?: string;
    disable?: boolean | ((node: EditableAntdTreeNode) => boolean | undefined);
    event?: (node: EditableAntdTreeNode) => void;
  };
  createLeaf?: {
    caption?: string;
    disable?: boolean | ((node: EditableAntdTreeNode) => boolean | undefined);
    event?: (node: EditableAntdTreeNode) => void;
  };
  createParent?: {
    caption?: string;
    disable?: boolean | ((node: EditableAntdTreeNode) => boolean | undefined);
    event?: (node: EditableAntdTreeNode) => void;
  };
};

export type TEditableTreeTitle = Omit<
  EditableTreeTitleProps,
  'treeData' | 'setTreeData' | 'node' | 'expandKey'
>;

export const EditableTreeTitle = ({
  treeData,
  setTreeData,
  source,
  expandKey,
  node,
  deleteNode,
  updateNode,
  createLeaf,
  createParent
}: EditableTreeTitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState((node.title as string) || '')
  const [edit, setEdit] = useState(treeData && !node.title)
  const navigate = useNavigate()
  const handleCreateLeafClick = () => {
    if (!node.children) {
      return
    }

    deleteTreeNode(treeData, '')
    expandKey(node.key)

    node.children?.push({
      key: '',
      title: null,
      isLeaf: true,
      parent: node.key
    })
    setTreeData([...treeData])
  }

  const onsubmit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div >
            <h1>Are you sure?</h1>
            <p>You want to delete?</p>
            <div className="row">
            <div className= "col-md-6">
            <button className="btn btn-success" onClick={onClose}>No</button>
            </div>
            <div className= "col-md-6">
            <button className="btn btn-danger"
             onClick={() => {
               handleDeleteClick();
               onClose();
             }} >
              Yes
            </button>
            </div>
            </div>
          </div>
        );
      }
    });
  }

  const handleCreateParentClick = () => {
    if (!node.children) {
      return
    }

    deleteTreeNode(treeData, '')
    expandKey(node.key)

    node.children?.push({
      key: '',
      title: null,
      isLeaf: false,
      parent: node.key,
      children: []
    })
    setTreeData([...treeData])
  }

  const handleDeleteClick = () => {
    deleteTreeNode(treeData, node.key)
    setTreeData([...treeData])
    node.title = node.title?.replaceAll(' ', '_')
    api.delete(`form/deletedirectory/formlayout/${node.title}`)

    if (deleteNode?.event) {
      deleteNode.event(node)
    }
  }

  const handleUpdateClick = () => {
    const initValue = node.title

    if (inputValue === node.title) {
      handleEditToggle(true)
      return
    }

    node.title = inputValue
    node.key = uuidv4()

    if (!initValue && !node.children && createLeaf?.event) {
      createLeaf?.event(node)
    }

    if (!initValue && node.children && createParent?.event) {
      createParent?.event(node)
    }

    if (initValue && updateNode?.event) {
      updateNode?.event(node)
    }

    handleEditToggle(true)
    setTreeData([...treeData])
    const formData = ['Movie'
    ]
    const title = node.title.replaceAll(' ', '_')
    api.post(`/form/writefile/formlayout/${title}/professionaldata`, formData)
  }

  const navigateToTree = (title: string) => {
    localStorage.setItem('selectedLabel', title)
    navigate('/admin/professionaltree', { state: { titlePath: title } })
  }
  const navigateToFom = (title: string) => {
    localStorage.setItem('selectedLabel', title)
    navigate('/admin/formbuilders')
  }

  const handleEditToggle = (onOpen: boolean) => {
    if (!node.title) {
      handleDeleteClick()
      return
    }

    if (!onOpen) {
      setInputValue(node.title as string)
    }

    setEdit((prev) => !prev)
  }

  const isActionDisabled = (
    action?: boolean | ((node: EditableAntdTreeNode) => boolean | undefined)
  ) => {
    return typeof action === 'function' ? action(node) : !action
  }

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus()
    }
  }, [edit])

  return (
    <div className="flex items-center space-x-4">
      {edit
        ? (
          <div className="flex items-center space-x-1">
            <TextInput
              ref={inputRef}
              value={inputValue}
              className="outline-none px-2 border-none py-0"
              onChange={(value) => setInputValue(value)}
              onEnter={handleUpdateClick}
            />
            <div className="flex space-x-0.5">
              <button onClick={handleUpdateClick}>
                <BiCheck />
              </button>
              <button onClick={() => handleEditToggle(false)}>
                <GrFormClose />
              </button>
            </div>
          </div>
          )
        : (
          <span>{node.title as string}</span>
          )}
      <div
        className={twMerge(
          'space-x-1 flex items-center text-gray-600',
          edit && 'hidden'
        )}
      >
        {isActionDisabled(createParent?.disable) && source === 'level2' && node.children && (
          <Tooltip title={createParent?.caption || 'Create Parent'}>
            <button onClick={handleCreateParentClick}>
              <AiOutlineSisternode />
            </button>
          </Tooltip>
        )}

        {isActionDisabled(createLeaf?.disable) && source === 'level2' && node.children && (
          <Tooltip title={createLeaf?.caption || 'Create Leaf'}>
            <button onClick={handleCreateLeafClick}>
              <AiOutlineSubnode />
            </button>
          </Tooltip>
        )}

        {isActionDisabled(updateNode?.disable) && source === 'level2' && (
          <Tooltip title={updateNode?.caption || 'Update Node'}>
            <button onClick={() => handleEditToggle(true)}>
              <RiPencilFill />
            </button>
          </Tooltip>
        )}

        {isActionDisabled(deleteNode?.disable) && source === 'level2' && (
            <button onClick={onsubmit}>
              <MdDelete />
            </button>
        )}

        {source === 'level1' && (
          <Tooltip title={'Add Form'}>
            <button id='form_icon' onClick={() => navigateToFom(node.title as string)}>
              <AiOutlineForm
                style={{ marginLeft: 10 }}
                size={24} />
            </button>
          </Tooltip>

        )}
        {source === 'level1' && (
          <Tooltip title={'Add SubIndustry'}>
            <button id='tree_icon' onClick={() => navigateToTree(node.title as string)}>
              <BinaryTree
                size={24}
              />
            </button>
          </Tooltip>

        )}
      </div>
    </div>
  )
}
