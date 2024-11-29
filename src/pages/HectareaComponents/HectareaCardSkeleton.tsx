import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function HectareaCardSkeleton() {
  return (
    <Card className="h-[200px] flex flex-col justify-between">
      <CardContent className="p-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  )
}
