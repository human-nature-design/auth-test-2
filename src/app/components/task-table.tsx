"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Checkbox } from "@/ui/components/Checkbox";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { IconButton } from "@/ui/components/IconButton";
import { Table } from "@/ui/components/Table";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherClipboardList } from "@subframe/core";
import { FeatherFingerprint } from "@subframe/core";
import { FeatherHelpCircle } from "@subframe/core";
import { FeatherIndent } from "@subframe/core";
import { FeatherListFilter } from "@subframe/core";
import { FeatherMoreHorizontal } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { FeatherRocket } from "@subframe/core";
import { FeatherTable } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { getTodos, addTodo, deleteTodo, completeTodo } from "@/app/(protected)/tasks/actions";
import type { Todo } from "@/types";



function TaskTracker({initialTodos, addTodo, deleteTodo, completeTodo}: TaskTrackerProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos || []);
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12">
        <div className="flex w-full flex-col items-start gap-2 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
          <div className="flex w-full flex-wrap items-center gap-2 mobile:flex-row mobile:flex-wrap mobile:gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <FeatherRocket className="text-heading-2 font-heading-2 text-brand-600" />
              <span className="text-heading-2 font-heading-2 text-default-font">
                My tasks
              </span>
            </div>
            <div className="flex items-center gap-2 mobile:h-auto mobile:grow mobile:shrink-0 mobile:basis-0">
              <IconButton
                variant="neutral-secondary"
                icon={<FeatherHelpCircle />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                variant="brand-primary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start gap-2 mobile:flex-row mobile:flex-wrap mobile:gap-4">
          <ToggleGroup
            className="mobile:h-auto mobile:grow mobile:shrink-0 mobile:basis-0"
            value=""
            onValueChange={(value: string) => {}}
          >
            <ToggleGroup.Item icon={<FeatherTable />} value="209e69eb">
              Table
            </ToggleGroup.Item>
          </ToggleGroup>
          <div className="flex flex-wrap items-start gap-2">
            <SubframeCore.Popover.Root>
              <SubframeCore.Popover.Trigger asChild={true}>
                <Button
                  variant="neutral-tertiary"
                  icon={<FeatherListFilter />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  All tasks
                </Button>
              </SubframeCore.Popover.Trigger>
              <SubframeCore.Popover.Portal>
                <SubframeCore.Popover.Content
                  side="bottom"
                  align="center"
                  sideOffset={4}
                  asChild={true}
                >
                  <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
                    <span className="text-caption font-caption text-subtext-color">
                      Add filters
                    </span>
                  </div>
                </SubframeCore.Popover.Content>
              </SubframeCore.Popover.Portal>
            </SubframeCore.Popover.Root>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <IconButton
                  icon={<FeatherMoreHorizontal />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem>
                      Favorite
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherTrash />}>
                      Delete
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-2 border-t border-solid border-neutral-border pt-0.5 overflow-auto">
          
          
          
          <Table
            header={
              <Table.HeaderRow className="h-auto w-full flex-none">
                <Table.HeaderCell className="h-8 max-w-[48px] grow shrink-0 basis-0">
                  done
                </Table.HeaderCell>
                <Table.HeaderCell icon={<FeatherFingerprint />}>
                  id
                </Table.HeaderCell>
                <Table.HeaderCell icon={<FeatherClipboardList />}>
                  task
                </Table.HeaderCell>
                <Table.HeaderCell icon={<FeatherIndent />}>
                  inserted_at
                </Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {initialTodos?.map((todo) => (

            <Table.Row key={todo.id} className="h-auto w-full max-w-[16px] flex-none">
              <Table.Cell className="h-12 max-w-[48px] grow shrink-0 basis-0">
                <Checkbox
                  label=""
                  checked={todo.is_complete}
                  onCheckedChange={(checked: boolean) => {
                    completeTodo(todo.id, checked);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <span className="grow shrink-0 basis-0 whitespace-nowrap text-body font-body text-neutral-500 text-left">
                  {todo.id}
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                  {todo.task}
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {todo.inserted_at}
                </span>
              </Table.Cell>
            </Table.Row>
            ))}
          </Table>
          <div className="flex w-full items-start justify-between">
            <Button
              variant="neutral-tertiary"
              icon={<FeatherPlus />}
              onClick={() => {
                addTodo("");
              }}
            >
              task
            </Button>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default TaskTracker;