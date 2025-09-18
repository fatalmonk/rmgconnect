import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rmgconnect.com' },
    update: {},
    create: {
      email: 'admin@rmgconnect.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      companyName: 'RMGConnect Admin',
      companyType: 'FACTORY',
      isVerified: true,
    },
  })

  // Create sample factory user
  const factoryPassword = await bcrypt.hash('factory123', 12)
  
  const factory = await prisma.user.upsert({
    where: { email: 'factory@example.com' },
    update: {},
    create: {
      email: 'factory@example.com',
      name: 'Sample Factory',
      password: factoryPassword,
      role: 'FACTORY',
      companyName: 'Sample Garments Factory',
      companyType: 'FACTORY',
      isVerified: true,
    },
  })

  // Create sample buyer user
  const buyerPassword = await bcrypt.hash('buyer123', 12)
  
  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      name: 'Sample Buyer',
      password: buyerPassword,
      role: 'BUYER',
      companyName: 'Sample Retail Company',
      companyType: 'BUYER',
      isVerified: true,
    },
  })

  console.log('Seed data created:')
  console.log('Admin:', admin.email, 'Password: admin123')
  console.log('Factory:', factory.email, 'Password: factory123')
  console.log('Buyer:', buyer.email, 'Password: buyer123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
