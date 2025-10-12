'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { IconButton } from "@/ui/components/IconButton";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherLogOut, FeatherUser } from "@subframe/core";
import * as SubframeCore from "@subframe/core";

export default function UserProfileSettings() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <SubframeCore.DropdownMenu.Root>
      <SubframeCore.DropdownMenu.Trigger asChild={true}>
        <IconButton
          icon={<FeatherUser />}
          onClick={() => {}}
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
            <DropdownMenu.DropdownItem icon={<FeatherLogOut />} onClick={handleLogout}>
              Logout
            </DropdownMenu.DropdownItem>
          </DropdownMenu>
        </SubframeCore.DropdownMenu.Content>
      </SubframeCore.DropdownMenu.Portal>
    </SubframeCore.DropdownMenu.Root>
  )
}
