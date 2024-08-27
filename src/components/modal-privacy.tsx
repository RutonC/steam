import {ScrollArea} from '@/components/ui/scroll-area'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Privacy = {
  message:string
}

export function ModalPrivacy({message}:Privacy) {
  return (
    
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Políticas de Privacidade</DialogTitle>
        </DialogHeader>
        <div className="">
          <ScrollArea className='h-[400px]'>
          <p className='text-md text-gray-500'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet numquam adipisci, quidem, ducimus nihil perferendis laborum deleniti, dolor iusto officiis modi sequi sunt animi? Autem nemo inventore impedit veniam amet? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur libero nesciunt assumenda corporis, distinctio quo deleniti impedit ea natus corrupti totam vel explicabo, quis sit! Tempore nostrum sed nisi placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nesciunt laudantium rerum animi. Excepturi natus dolor voluptate, voluptates sunt laudantium amet, quisquam veritatis magni praesentium minus. Nulla nobis ratione nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nesciunt facere debitis, similique sed velit animi saepe dolorum aperiam aspernatur ad numquam eius temporibus? Ab hic mollitia voluptatibus atque magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi nisi magnam accusantium saepe cupiditate illo, ullam harum assumenda quaerat dolores incidunt nostrum voluptatem quas porro cumque possimus cum iure. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse at cupiditate perferendis, possimus non labore qui commodi, explicabo, mollitia asperiores numquam dicta. Accusantium, corrupti repellat tempore ducimus nihil minus quibusdam!
          </p>
          </ScrollArea>
        </div>
      </DialogContent>
  )
}
