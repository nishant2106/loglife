import { Prisma } from "@prisma/client"

export const softDelete = Prisma.defineExtension({
  name: "softDelete",
  model: {
    $allModels: {
      async delete<M, A>(this: M, where: Prisma.Args<M, "delete">["where"]): Promise<Prisma.Result<M, A, "update">> {
        const context = Prisma.getExtensionContext(this)

        return (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
          },
        })
      },
    },
  },
})

export const softDeleteMany = Prisma.defineExtension({
  name: "softDeleteMany",
  model: {
    $allModels: {
      async deleteMany<M, A>(
        this: M,
        where: Prisma.Args<M, "deleteMany">["where"],
      ): Promise<Prisma.Result<M, A, "updateMany">> {
        const context = Prisma.getExtensionContext(this)

        return (context as any).updateMany({
          where,
          data: {
            deletedAt: new Date(),
          },
        })
      },
    },
  },
})

const applySoftDeleteFilter = (includeOrSelect: Record<string, any>) => {
  if (typeof includeOrSelect !== "object" || includeOrSelect === null) return includeOrSelect

  for (const key in includeOrSelect) {
    const relation = includeOrSelect[key]
    if (!relation || typeof relation !== "object") continue

    if ("include" in relation) relation.include = applySoftDeleteFilter(relation.include)
    if ("select" in relation) relation.select = applySoftDeleteFilter(relation.select)

    includeOrSelect[key] = {
      ...relation,
      where: {
        ...relation.where,
        deletedAt: null,
      },
    }
  }

  return includeOrSelect
}

export const filterSoftDeleted = Prisma.defineExtension({
  name: "filterSoftDeleted",
  query: {
    $allModels: {
      async $allOperations({
        operation,
        args,
        query,
      }: {
        model: string
        operation: string
        args: Record<string, any>
        query: (args: Record<string, any>) => Promise<unknown>
      }) {
        const operationsWithWhere = new Set([
          "findUnique",
          "findUniqueOrThrow",
          "findFirst",
          "findFirstOrThrow",
          "findMany",
          "count",
          "aggregate",
          "groupBy",
        ])

        if (!operationsWithWhere.has(operation)) {
          return query(args)
        }

        args.where = {
          ...args.where,
          deletedAt: null,
        }

        if ("include" in args && args.include) {
          args.include = applySoftDeleteFilter(args.include)
        }

        if ("select" in args && args.select) {
          args.select = applySoftDeleteFilter(args.select)
        }

        return query(args)
      },
    },
  },
})
