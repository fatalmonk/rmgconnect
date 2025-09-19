import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Bangladesh RMG Industry Data
const bangladeshAreas = [
  'Dhaka', 'Gazipur', 'Narayanganj', 'Savar', 'Ashulia', 'Tongi', 'Keraniganj',
  'Chittagong', 'Sitakunda', 'Feni', 'Comilla', 'Sylhet', 'Rajshahi', 'Khulna'
]

const factoryNames = [
  'Textile Mills Ltd', 'Garment Industries', 'Fashion Wear Ltd', 'Apparel Solutions',
  'Textile Works', 'Fashion House', 'Garment Factory', 'Textile Company',
  'Apparel Industries', 'Fashion Textiles', 'Garment Works', 'Textile Hub',
  'Fashion Mills', 'Apparel Works', 'Textile Solutions', 'Garment Hub',
  'Fashion Industries', 'Textile House', 'Apparel Mills', 'Fashion Solutions'
]

const companySuffixes = [
  'Ltd', 'Limited', 'Industries', 'Group', 'Enterprises', 'Corporation', 'Company'
]

const exportCountries = [
  'USA, Canada, UK', 'USA, Germany, France', 'UK, Italy, Spain', 'USA, Australia, Japan',
  'Germany, Netherlands, Belgium', 'USA, Canada, Mexico', 'UK, Ireland, Denmark',
  'USA, France, Italy', 'Germany, Austria, Switzerland', 'USA, UK, Australia'
]

const complianceStatuses = [
  'Compliant', 'Under Review', 'Minor Issues', 'Compliant', 'Compliant', 'Compliant'
]

const membershipTypes = ['General', 'Associate']

function generateBGMEARegNo(): string {
  const year = Math.floor(Math.random() * 10) + 2015
  const randomNum = Math.floor(Math.random() * 9000) + 1000
  return `BGMEA-${year}-${randomNum}`
}

function generatePhone(): string {
  const prefixes = ['017', '018', '019', '015', '016']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const number = Math.floor(Math.random() * 90000000) + 10000000
  return `+880${prefix}${number.toString().slice(2)}`
}

function generateEmail(companyName: string): string {
  const cleanName = companyName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 15)
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com.bd']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `info@${cleanName}.${domain}`
}

function generateWebsite(companyName: string): string {
  const cleanName = companyName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 15)
  return `https://www.${cleanName}.com.bd`
}

function generateAddress(area: string): string {
  const streets = ['Industrial Area', 'Export Processing Zone', 'Garment Village', 'Textile Hub']
  const street = streets[Math.floor(Math.random() * streets.length)]
  const building = Math.floor(Math.random() * 500) + 1
  return `${building}, ${street}, ${area}, Bangladesh`
}

function generateCompanyName(): string {
  const name = factoryNames[Math.floor(Math.random() * factoryNames.length)]
  const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)]
  return `${name} ${suffix}`
}

function generateDescription(): string {
  const descriptions = [
    'Leading manufacturer of high-quality ready-made garments with modern facilities and skilled workforce.',
    'Established textile company specializing in export-oriented garment production with international standards.',
    'Professional garment manufacturer committed to quality, compliance, and sustainable production practices.',
    'Reputable textile industry with state-of-the-art machinery and experienced production team.',
    'Trusted manufacturer of fashion garments with focus on innovation and customer satisfaction.',
    'Well-established garment factory with strong export capabilities and quality assurance systems.',
    'Modern textile facility producing premium quality garments for international markets.',
    'Experienced manufacturer with comprehensive quality control and compliance management.',
    'Leading garment producer with eco-friendly practices and international certifications.',
    'Professional textile company with advanced production capabilities and skilled workforce.'
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

async function main() {
  console.log('🌱 Starting seed process...')

  // Clear existing organizations
  await prisma.organization.deleteMany({})
  console.log('🗑️ Cleared existing organizations')

  // Create 100 manufacturers
  const manufacturers = []
  for (let i = 0; i < 100; i++) {
    const companyName = generateCompanyName()
    const area = bangladeshAreas[Math.floor(Math.random() * bangladeshAreas.length)]
    const bgmeaRegNo = generateBGMEARegNo()
    const isBGMEAMember = Math.random() > 0.3 // 70% chance of being BGMEA member
    
    const manufacturer = await prisma.organization.create({
      data: {
        name: companyName,
        type: 'FACTORY',
        description: generateDescription(),
        website: generateWebsite(companyName),
        email: generateEmail(companyName),
        phone: generatePhone(),
        address: generateAddress(area),
        country: 'Bangladesh',
        isVerified: Math.random() > 0.4, // 60% verified
        bgmeaRegNo: isBGMEAMember ? bgmeaRegNo : null,
        bgmeaMember: isBGMEAMember,
        bgmeaVerified: isBGMEAMember && Math.random() > 0.2, // 80% of BGMEA members verified
        contactPerson: `Mr. ${['Rahman', 'Hassan', 'Ali', 'Khan', 'Ahmed', 'Islam', 'Miah'][Math.floor(Math.random() * 7)]} ${['Manager', 'Director', 'Owner', 'CEO'][Math.floor(Math.random() * 4)]}`,
        bgmeaDetailsUrl: isBGMEAMember ? `https://www.bgmea.com.bd/member/${bgmeaRegNo}` : null,
        registrationDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        membershipType: isBGMEAMember ? membershipTypes[Math.floor(Math.random() * membershipTypes.length)] : null,
        complianceStatus: complianceStatuses[Math.floor(Math.random() * complianceStatuses.length)],
        productionCapacity: Math.floor(Math.random() * 2000) + 200, // 200-2200 workers
        employeeCount: Math.floor(Math.random() * 2500) + 250, // 250-2750 employees
        exportCountries: exportCountries[Math.floor(Math.random() * exportCountries.length)],
        lastAudit: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        complianceScore: Math.floor(Math.random() * 40) + 60, // 60-100 score
        greenFactory: Math.random() > 0.7, // 30% are green factories
      }
    })
    
    manufacturers.push(manufacturer)
    
    if ((i + 1) % 20 === 0) {
      console.log(`✅ Created ${i + 1}/100 manufacturers`)
    }
  }

  console.log(`🎉 Successfully seeded ${manufacturers.length} manufacturers!`)
  
  // Create some sample users (with error handling)
  try {
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

    console.log('✅ Admin user created:', admin.email)
    
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

    console.log('✅ Factory user created:', factory.email)
    
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

    console.log('✅ Buyer user created:', buyer.email)
    console.log('👤 Seeded admin and sample users')
    console.log('')
    console.log('🔐 Test Credentials:')
    console.log('Admin:', admin.email, 'Password: admin123')
    console.log('Factory:', factory.email, 'Password: factory123')
    console.log('Buyer:', buyer.email, 'Password: buyer123')
  } catch (userError) {
    console.log('⚠️ User creation failed, but manufacturers were created successfully')
    console.log('Error:', userError.message)
  }

  console.log('📊 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })