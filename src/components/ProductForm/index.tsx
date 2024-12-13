import { KeyboardEventHandler, useRef, useState } from "react"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CreatableSelect from "react-select/creatable"
// using react-quill will throw errors in console, since findDOMNode is deprecated in React 19
import ReactQuill from "react-quill"
import { BsPlus } from "react-icons/bs"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"
import InputGroup from "react-bootstrap/InputGroup"

import schema, { ProductFormValues } from "./schema"
import { Option } from "./types"
import { DEFAULT_KEYWORDS } from "./consts"
import SortableList from "../SortableList"

const ProductForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
  })
  const newItemInputRef = useRef<HTMLInputElement>(null)

  // to allow to append new options with some default mock
  const [keywordOptions, setKeywordOptions] =
    useState<Option[]>(DEFAULT_KEYWORDS)

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => console.log(data)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={3}>
        <Form.Group>
          <Form.Label htmlFor="title">
            Title:<span>*</span>
          </Form.Label>
          <Form.Control
            id="title"
            {...register("title")}
            placeholder="i.e. Snow Sleds"
            className={errors.title ? "border-danger" : undefined}
          />
          {errors.title && (
            <Form.Text className="text-danger">
              {errors.title.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                placeholder="Type the description (optional)"
                modules={{
                  // Limit the rich text field according to the requirements.
                  toolbar: [["bold", "italic", "underline"]],
                }}
              />
            )}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Items:</Form.Label>
          <Controller
            name="items"
            control={control}
            render={({ field }) => {
              const onAddItem = () => {
                if (
                  newItemInputRef.current?.value &&
                  !field.value?.includes(newItemInputRef.current.value)
                ) {
                  field.onChange([
                    ...(field.value ?? []),
                    newItemInputRef.current.value,
                  ])
                  newItemInputRef.current.value = ""
                }
              }

              const onNewItemInputKeydown: KeyboardEventHandler = (event) => {
                if (event.key === "Enter") {
                  // Prevent form submission when Enter is pressed in the input group
                  event.preventDefault()
                  onAddItem()
                }
              }

              return (
                <>
                  <SortableList
                    items={field.value}
                    onSort={(fromIndex, toIndex) => {
                      const updatedItems = [...(field.value ?? [])]
                      const [movedItem] = updatedItems.splice(fromIndex, 1)
                      updatedItems.splice(toIndex, 0, movedItem)
                      field.onChange(updatedItems)
                    }}
                    onRemove={(itemToRemove) =>
                      field.onChange(
                        field.value?.filter(
                          (currentItem) => currentItem !== itemToRemove
                        )
                      )
                    }
                  />
                  <InputGroup>
                    <Form.Control
                      ref={newItemInputRef}
                      onKeyDown={onNewItemInputKeydown}
                      placeholder="Type new item description..."
                    />
                    <Button
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={onAddItem}
                    >
                      <BsPlus />
                      Add Item
                    </Button>
                  </InputGroup>
                </>
              )
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Keywords:</Form.Label>
          <Controller
            name="keywords"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                isMulti
                placeholder="Select or add keywords"
                // I decided not to store Option object in schema to make it clean for "API" DTO
                // but this requires transforming field value string into Option as this is what
                // react-select expect.
                // Alternative would be using field value directly (dont need to specify value as it
                // passed using destructor {...field} above), but the trade-off is changing the
                // schema for keywords to be an object and adding tranformation to API-friendly format
                // since we need values of Options only.
                value={field.value
                  ?.map((keyword) =>
                    keywordOptions.find(({ value }) => value === keyword)
                  )
                  .filter((item) => !!item)}
                options={keywordOptions}
                onCreateOption={(inputValue) => {
                  setKeywordOptions((prev) => [
                    ...prev,
                    {
                      value: inputValue,
                      label: inputValue,
                    },
                  ])
                  // onChange is skipped when onCreateOption is triggered, need to add manually
                  field.onChange([...(field.value ?? []), inputValue])
                }}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions.map(({ value }) => value))
                }
              />
            )}
          />
        </Form.Group>

        <hr />

        <Button type="submit" className="align-self-start">
          Submit
        </Button>
      </Stack>
    </Form>
  )
}

export default ProductForm
