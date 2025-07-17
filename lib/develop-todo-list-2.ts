// ... other models

model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("todos")
}