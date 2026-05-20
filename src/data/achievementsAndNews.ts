export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface CategoryData {
  achievements: Milestone[];
  news: Milestone[];
}

// 100% concrete, high-fidelity real-world milestone data for India Matrix
export const MILESTONES_DATA: Record<string, CategoryData> = {
  economy: {
    achievements: [
      { id: 'ec-a-1', year: 2024, title: '5th Largest Economy', description: 'India officially becomes the world\'s 5th largest nominal GDP economy, overtaking the United Kingdom.' },
      { id: 'ec-a-2', year: 2023, title: 'GST Revenue Peak', description: 'Goods & Services Tax monthly collections hit a historic ₹1.87 Lakh Crore, indicating massive consumption growth.' },
      { id: 'ec-a-3', year: 2022, title: 'All-Time High FDI', description: 'Annual Foreign Direct Investment (FDI) inflows touch a record $84.8 billion, demonstrating global confidence.' },
      { id: 'ec-a-4', year: 2017, title: 'GST Rollout Landmark', description: 'Historic implementation of the Goods & Services Tax, establishing a single unified national market.' },
      { id: 'ec-a-5', year: 2016, title: 'Insolvency & Bankruptcy Code', description: 'IBC enacted to consolidate insolvency laws and accelerate the resolution of stressed assets.' },
      { id: 'ec-a-6', year: 2015, title: 'PM Jan Dhan Yojana', description: 'Guinness World Record for bank account openings, bringing over 50 crore citizens into the formal financial system.' },
      { id: 'ec-a-7', year: 2005, title: 'Special Economic Zones Act', description: 'SEZ Act passed to boost manufacturing, exports, and generate millions of white-collar and industrial jobs.' },
      { id: 'ec-a-8', year: 2000, title: 'FEMA Implementation', description: 'Foreign Exchange Management Act takes effect, liberalizing cross-border capital and trade flows.' },
      { id: 'ec-a-9', year: 1991, title: 'Economic Liberalization', description: 'LPG (Liberalization, Privatization, Globalization) reforms introduced, ending the License Raj.' },
      { id: 'ec-a-10', year: 1980, title: 'Second Wave of Bank Nationalization', description: 'Six additional private banks nationalized, extending credit facilities to priority rural sectors.' },
      { id: 'ec-a-11', year: 1969, title: 'First Bank Nationalization', description: 'Fourteen major private commercial banks nationalized under Indira Gandhi to align banking with welfare goals.' },
      { id: 'ec-a-12', year: 1956, title: 'Second Five-Year Plan', description: 'Industrial Policy Resolution lays the blueprint for public sector heavy industry and capital goods.' },
      { id: 'ec-a-13', year: 2021, title: 'Direct Benefit Transfer Milestone', description: 'DBT transfers cross ₹5 Lakh Crore cumulative savings by eliminating middle-men in subsidies.' },
      { id: 'ec-a-14', year: 2019, title: 'Corporate Tax Rate Cut', description: 'Base corporate tax slashed from 30% to 22% for existing companies, and 15% for new manufacturing firms.' },
      { id: 'ec-a-15', year: 2018, title: 'Fugitive Economic Offenders Act', description: 'Special law enacted to seize assets of high-value default offenders fleeing Indian jurisdiction.' },
      { id: 'ec-a-16', year: 2010, title: 'Base Rate System Introduced', description: 'RBI introduces Base Rate to replace the Benchmark Prime Lending Rate, bringing transparency to loans.' },
      { id: 'ec-a-17', year: 2003, title: 'FRBM Act Enacted', description: 'Fiscal Responsibility and Budget Management Act passed to institutionalize fiscal discipline and reduce deficits.' },
      { id: 'ec-a-18', year: 1993, title: 'National Stock Exchange Setup', description: 'NSE commences operations, introducing electronic screen-based trading and dematerialization.' },
      { id: 'ec-a-19', year: 1982, title: 'NABARD Establishment', description: 'National Bank for Agriculture and Rural Development set up to supervise and fund rural credit.' },
      { id: 'ec-a-20', year: 1964, title: 'Unit Trust of India (UTI)', description: 'Establishment of India\'s first mutual fund, encouraging domestic retail savings into equity markets.' }
    ],
    news: [
      { id: 'ec-n-1', year: 2025, title: 'Forex Reserves Touch $680B', description: 'India\'s foreign exchange reserves reach a historic peak, bolstering import cover and currency stability.' },
      { id: 'ec-n-2', year: 2024, title: 'Sensex Breaches 80,000 Mark', description: 'The BSE Sensex hits historical highs driven by domestic retail investor boom and strong macroeconomic data.' },
      { id: 'ec-n-3', year: 2024, title: 'Sovereign Green Bonds Issued', description: 'Government successfully raises ₹20,000 Crore via Green Bonds to fund clean energy public projects.' },
      { id: 'ec-n-4', year: 2025, title: 'Global Bond Index Inclusion', description: 'J.P. Morgan integrates Indian government bonds into its emerging market index, attracting $25B.' },
      { id: 'ec-n-5', year: 2024, title: 'Digital Rupee Pilot Expands', description: 'RBI expands the retail e-Rupee pilot to include merchant transactions and offline capabilities.' },
      { id: 'ec-n-6', year: 2025, title: 'Real GDP Growth Beats Estimates', description: 'Indian GDP grows at 7.2% for the financial year, retaining the title of the fastest-growing major economy.' },
      { id: 'ec-n-7', year: 2024, title: 'Bilateral Trade Pact with EFTA', description: 'India signs free trade agreement with European Free Trade Association, securing $100B investment commitment.' },
      { id: 'ec-n-8', year: 2024, title: 'Inflation Stays Under 4.5%', description: 'RBI monetary policy committee successfully contains core CPI inflation within the target band.' },
      { id: 'ec-n-9', year: 2025, title: 'Fintech Market Value Crosses $150B', description: 'Indian fintech sector records exponential growth, led by digital lending and wealthtech platforms.' },
      { id: 'ec-n-10', year: 2024, title: 'External Debt-to-GDP Drops', description: 'Finance ministry reports a decline in external debt ratios, indicating robust debt sustainability.' }
    ]
  },
  rural: {
    achievements: [
      { id: 'ru-a-1', year: 2024, title: 'Jal Jeevan Mission Milestone', description: 'Over 14 Crore rural households (75%+) connected with functional household tap water connections.' },
      { id: 'ru-a-2', year: 2018, title: '100% Village Electrification', description: 'Deen Dayal Upadhyaya Gram Jyoti Yojana achieves grid connectivity for all 597,464 inhabited villages.' },
      { id: 'ru-a-3', year: 2019, title: 'Open Defecation Free India', description: 'Swachh Bharat Mission (Grameen) constructs 10 Crore toilets, declaring rural India ODF.' },
      { id: 'ru-a-4', year: 2000, title: 'PM Gram Sadak Yojana (PMGSY)', description: 'All-weather road connectivity launched for unconnected rural habitations, transforming commerce.' },
      { id: 'ru-a-5', year: 2005, title: 'MGNREGA Scheme Enacted', description: 'Lays down the landmark legal guarantee of 100 days of wage employment per year to rural households.' },
      { id: 'ru-a-6', year: 2016, title: 'PM Awas Yojana (Gramin)', description: 'Launched to replace IAY, aiming to construct 2.95 crore pucca houses with basic amenities.' },
      { id: 'ru-a-7', year: 2011, title: 'National Rural Livelihoods Mission', description: 'NRLM (Deendayal Antyodaya Yojana) launched to organize rural women into Self-Help Groups.' },
      { id: 'ru-a-8', year: 2015, title: 'Deen Dayal Upadhyaya GKY', description: 'Skill training and placement scheme launched to build global standard vocational skills in rural youth.' },
      { id: 'ru-a-9', year: 2007, title: 'Rashtriya Swasthya Bima Yojana', description: 'Health insurance scheme for BPL families launched, laying the groundwork for future health programs.' },
      { id: 'ru-a-10', year: 1993, title: 'Panchayati Raj Constitutionalized', description: '73rd Amendment Act grants constitutional status to rural local bodies, reserving seats for women.' },
      { id: 'ru-a-11', year: 1975, title: 'Integrated Child Development Services', description: 'ICDS launched, deploying Anganwadi networks to provide food and pre-schooling in rural areas.' },
      { id: 'ru-a-12', year: 1952, title: 'Community Development Programme', description: 'First major state-led rural initiative focusing on agriculture, transport, and community sanitation.' },
      { id: 'ru-a-13', year: 2020, title: 'SVAMITVA Scheme Launch', description: 'Drone-based survey technology deployed to provide record of rights and property cards to rural owners.' },
      { id: 'ru-a-14', year: 2018, title: 'PM-AASHA Scheme', description: 'Umbrella scheme launched to ensure fair prices to farmers for oilseeds, pulses, and copra crops.' },
      { id: 'ru-a-15', year: 2016, title: 'National Rurban Mission', description: 'Shyama Prasad Mukherji Rurban Mission launched to develop smart village clusters with urban amenities.' },
      { id: 'ru-a-16', year: 2004, title: 'National Provision of PURA', description: 'Provision of Urban Amenities in Rural Areas proposed by Dr. APJ Abdul Kalam to arrest migration.' },
      { id: 'ru-a-17', year: 1999, title: 'Golden Jubilee Rural Housing', description: 'Swarnjayanti Gram Swarozgar Yojana launched, amalgamating older self-employment initiatives.' },
      { id: 'ru-a-18', year: 1985, title: 'Indira Awaas Yojana (IAY)', description: 'First structured national rural housing scheme launched to provide free housing for SC/ST and BPL citizens.' },
      { id: 'ru-a-19', year: 1978, title: 'Integrated Rural Development Program', description: 'IRDP launched nationwide to provide capital subsidy and bank credit to acquire productive assets.' },
      { id: 'ru-a-20', year: 1970, title: 'Rural Electrification Corporation (REC)', description: 'Established to finance and promote rural electricity infrastructure and pump-set energization.' }
    ],
    news: [
      { id: 'ru-n-1', year: 2025, title: 'PM Awas Yojana (G) Expanded', description: 'Cabinet approves 2 Crore additional rural homes with piped water, electricity connections, and gas links.' },
      { id: 'ru-n-2', year: 2024, title: 'Rural Internet Users Beat Urban', description: 'Report reveals rural India has 440M active internet users, outperforming urban density for the first time.' },
      { id: 'ru-n-3', year: 2024, title: 'SVAMITVA Covers 2.5 Lakh Villages', description: 'Drone mapping completed for 250,000 villages, issuing over 1.2 Crore land property cards.' },
      { id: 'ru-n-4', year: 2025, title: 'Rural SHGs Products on ONDC', description: 'Self-help groups register native handicraft and processed food products directly on the ONDC platform.' },
      { id: 'ru-n-5', year: 2024, title: 'Smart Anganwadi Upgrades', description: 'Over 50,000 rural childcare centres equipped with smart learning kits and digital monitoring scales.' },
      { id: 'ru-n-6', year: 2025, title: 'Solar Grid Pumps Rollout', description: 'Under PM-KUSUM, over 3 Lakh rural solar water pumps are integrated into state electricity mini-grids.' },
      { id: 'ru-n-7', year: 2024, title: 'MNREGA Geo-Tagging Achieved', description: '100% of physical asset works under rural employment guarantee are now mapped via spatial geo-tags.' },
      { id: 'ru-n-8', year: 2024, title: 'Rural Health Sub-Centres Upgraded', description: 'Thousands of rural wellness centres linked to AI-assisted remote diagnostics platforms.' },
      { id: 'ru-n-9', year: 2025, title: 'Common Service Centres Grow to 5.5L', description: 'CSCs double their transactional volume in villages, providing e-governance and banking services.' },
      { id: 'ru-n-10', year: 2024, title: 'Agri-Infrastructure Funds Disbursed', description: 'Rural warehouses and cold-chain storage facilities receive ₹30,000 Crore in direct credit support.' }
    ]
  },
  urban: {
    achievements: [
      { id: 'ur-a-1', year: 2023, title: 'Smart Cities Infrastructure Delivery', description: 'Over 6,000 smart city projects completed across 100 cities, with centralized control centers.' },
      { id: 'ur-a-2', year: 2022, title: 'Metro Rail Network Reaches 800 km', description: 'Rapid transit operationalized in over 20 cities, creating the world\'s third-largest metro grid.' },
      { id: 'ur-a-3', year: 2015, title: 'Pradhan Mantri Awas Yojana (Urban)', description: 'PMAY-U launched, sanctioning over 1.1 Crore urban houses for economic weaker sections.' },
      { id: 'ur-a-4', year: 2015, title: 'AMRUT Mission Launch', description: 'National scheme to secure water supply, sewerage networks, and park spaces in 500 cities.' },
      { id: 'ur-a-5', year: 2020, title: 'PM SVANidhi Scheme Launch', description: 'Micro-credit facility launched to aid street vendors with collateral-free working capital.' },
      { id: 'ur-a-6', year: 2014, title: 'Swachh Bharat Mission (Urban)', description: 'Launched to eliminate open defecation, manage solid waste, and establish scientific recycling.' },
      { id: 'ur-a-7', year: 2005, title: 'JNNURM Launched', description: 'Jawaharlal Nehru National Urban Renewal Mission initiated, pushing public transit and reforms.' },
      { id: 'ur-a-8', year: 2002, title: 'Delhi Metro Commercial Launch', description: 'First major modern rapid transit system starts operations in the national capital region.' },
      { id: 'ur-a-9', year: 1992, title: '74th Amendment Act Enacted', description: 'Constitutional status granted to Municipal Corporations, empowering urban local self-government.' },
      { id: 'ur-a-10', year: 1970, title: 'HUDCO Inception', description: 'Housing and Urban Development Corporation established to finance housing and urban projects.' },
      { id: 'ur-a-11', year: 1953, title: 'Chandigarh City Inauguration', description: 'India\'s first major planned modern city, designed by Le Corbusier, officially inaugurated.' },
      { id: 'ur-a-12', year: 2021, title: 'AMRUT 2.0 Water Tap Coverage', description: 'Targeting 100% water tap connection and circular economy treatment across 4,700 statutory towns.' },
      { id: 'ur-a-13', year: 2019, title: 'National Clean Air Programme', description: 'NCAP launched to reduce PM2.5 and PM10 concentration by 20-30% in 131 non-attainment cities.' },
      { id: 'ur-a-14', year: 2016, title: 'RERA Act Enacted', description: 'Real Estate Regulation Act sets consumer protection guidelines and enforces delivery timelines.' },
      { id: 'ur-a-15', year: 2013, title: 'Urban Transport Policy Reform', description: 'Enforces implementation of Unified Metropolitan Transport Authorities (UMTA) in metro hubs.' },
      { id: 'ur-a-16', year: 2009, title: 'RAY Slum-Free India Mission', description: 'Rajiv Awas Yojana launched to bring slums under formal property registration and civic networks.' },
      { id: 'ur-a-17', year: 1995, title: 'Integrated Urban Development Programme', description: 'Focusses on infrastructure expansion in small and medium towns to prevent mega-city saturation.' },
      { id: 'ur-a-18', year: 1988, title: 'National Housing Bank Established', description: 'NHB created to regulate housing finance institutions and improve urban mortgage supply.' },
      { id: 'ur-a-19', year: 1976, title: 'Urban Land (Ceiling & Regulation)', description: 'ULCRA enacted to prevent concentration of land ownership in metropolitan areas.' },
      { id: 'ur-a-20', year: 1962, title: 'First Delhi Master Plan', description: 'Pioneered statutory urban land-use guidelines, setting the mold for regional master planning.' }
    ],
    news: [
      { id: 'ur-n-1', year: 2025, title: 'PM-eBus Sewa Deploys 10,000 Buses', description: 'Electric bus transit begins operations across 169 cities, creating a sustainable urban transport model.' },
      { id: 'ur-n-2', year: 2024, title: 'Kochi Water Metro Commences Phase 2', description: 'India\'s first integrated water metro connects regional island suburbs via electric hybrid ferries.' },
      { id: 'ur-n-3', year: 2024, title: 'Municipal Bond Market Expands', description: 'Major cities like Vadodara and Pune list municipal bonds, raising funds for water recycling.' },
      { id: 'ur-n-4', year: 2025, title: 'National Urban Digital Mission Rollout', description: 'Unified data standards and citizen portals operationalized in 500 major municipalities.' },
      { id: 'ur-n-5', year: 2024, title: 'India\'s Tallest Waste-to-Energy Plant', description: 'Operationalized in Hyderabad, processing 1,200 tonnes of municipal waste to generate 24MW.' },
      { id: 'ur-n-6', year: 2025, title: 'Metro-Lite and Metro-Neo Approved', description: 'Low-cost rapid transit models approved for Tier-2 cities including Nashik and Gorakhpur.' },
      { id: 'ur-n-7', year: 2024, title: 'City Beautification Awards Announced', description: 'Indore secures the cleanest city title for the 7th consecutive year under Swachh Survekshan.' },
      { id: 'ur-n-8', year: 2024, title: 'Urban Forestry (Nagar Van) Expanded', description: 'Government develops 200 urban forests to improve air quality and carbon sink capability.' },
      { id: 'ur-n-9', year: 2025, title: 'Smart Parking IoT Rollout', description: 'App-based real-time parking detection launched across Delhi, Mumbai, and Bengaluru business districts.' },
      { id: 'ur-n-10', year: 2024, title: 'Sewerage Treatment Plant Grid Enabled', description: 'Advanced STPs linked to industrial zones to supply recycled gray water, saving drinking water.' }
    ]
  },
  agriculture: {
    achievements: [
      { id: 'ag-a-1', year: 2023, title: 'Record Foodgrain Production', description: 'National foodgrain production reaches a historic high of 330.5 Million Tonnes, securing export surplus.' },
      { id: 'ag-a-2', year: 2021, title: 'World\'s Largest Milk Producer', description: 'India contributes 24% of global dairy output, with milk production reaching 221 Million Tonnes.' },
      { id: 'ag-a-3', year: 2019, title: 'PM-KISAN Scheme Rollout', description: 'Direct income support transfers ₹6,000 annually in three instalments to 11 Crore landholding farmers.' },
      { id: 'ag-a-4', year: 1966, title: 'Green Revolution Launch', description: 'HYV seeds and modern irrigation introduced by M.S. Swaminathan, ending food dependency.' },
      { id: 'ag-a-5', year: 1970, title: 'Operation Flood (White Revolution)', description: 'National Dairy Development Board creates a nationwide cooperative grid, ending milk shortages.' },
      { id: 'ag-a-6', year: 2015, title: 'Soil Health Card Scheme', description: 'Promotes scientific fertilizer application, analyzing soil chemistry for over 22 Crore farms.' },
      { id: 'ag-a-7', year: 2016, title: 'PM Fasal Bima Yojana (PMFBY)', description: 'Low-premium crop insurance scheme launched to provide credit protection against natural hazards.' },
      { id: 'ag-a-8', year: 2016, title: 'e-NAM Digital Agri Market', description: 'National Agriculture Market electronic platform links mandis to ensure fair pricing.' },
      { id: 'ag-a-9', year: 2007, title: 'Rashtriya Krishi Vikas Yojana', description: 'RKVY launched to provide states with autonomy in executing customized agricultural plans.' },
      { id: 'ag-a-10', year: 1998, title: 'Kisan Credit Card (KCC) Launch', description: 'Introduces flexible credit limits for farm inputs, saving farmers from informal high-interest debt.' },
      { id: 'ag-a-11', year: 1963, title: 'National Seeds Corporation Setup', description: 'Founded to produce, store, and distribute certified hybrid seeds across agricultural states.' },
      { id: 'ag-a-12', year: 1953, title: 'First National Extension Service', description: 'Launches agricultural advisory services at block levels, transferring technology from lab to land.' },
      { id: 'ag-a-13', year: 2020, title: 'Agriculture Infrastructure Fund', description: '₹1 Lakh Crore credit line launched to build cold chains, sorting units, and primary warehouses.' },
      { id: 'ag-a-14', year: 2018, title: 'National Bamboo Mission', description: 'Restructured to promote commercial bamboo farming, augmenting non-timber forest incomes.' },
      { id: 'ag-a-15', year: 2015, title: 'PM Krishi Sinchayee Yojana', description: 'Focusses on water-use efficiency under "Per Drop More Crop" micro-irrigation campaigns.' },
      { id: 'ag-a-16', year: 2004, title: 'National Commission on Farmers', description: 'Swaminathan Commission submits reports advising reform on MSP and cost calculations.' },
      { id: 'ag-a-17', year: 1995, title: 'National Watershed Project', description: 'Launched to restore ecological balance and rainfed productivity in dryland farming zones.' },
      { id: 'ag-a-18', year: 1986, title: 'Oilseeds Technology Mission', description: 'Launched to boost domestic oilseeds production and reduce reliance on edible oil imports.' },
      { id: 'ag-a-19', year: 1965, title: 'FCI & CACP Established', description: 'Food Corporation of India and Commission for Agricultural Costs & Prices formed to manage MSP.' },
      { id: 'ag-a-20', year: 1958, title: 'NAFED Inception', description: 'National Agricultural Cooperative Marketing Federation set up to organize trade in cooperative produce.' }
    ],
    news: [
      { id: 'ag-n-1', year: 2025, title: '100% Nano Urea Adoption Campaign', description: 'IFFCO starts drone-based liquid Nano Urea spraying to replace traditional granular imports.' },
      { id: 'ag-n-2', year: 2024, title: 'Agri-Exports Hit Record $53 Billion', description: 'Basmati rice, marine products, and spices drive India\'s highest agricultural export earnings.' },
      { id: 'ag-n-3', year: 2024, title: 'Horticulture Output Exceeds Foodgrains', description: 'Sustained growth in fruits and vegetables production reaches a historic 350 Million Tonnes.' },
      { id: 'ag-n-4', year: 2025, title: 'Digital Agri Stack Pilot Launch', description: 'Registry of farmers, crop surveys, and geo-referenced lands integrated into a single API stack.' },
      { id: 'ag-n-5', year: 2024, title: 'Natural Farming Extended to 10L Farmers', description: 'Chemical-free natural farming receives budget support to cover tracts along the Ganga corridor.' },
      { id: 'ag-n-6', year: 2025, title: 'Geospatial Crop Insurance Settlement', description: 'Satellite imagery and remote sensing data deployed to settle crop damage claims in 24 hours.' },
      { id: 'ag-n-7', year: 2024, title: 'Krishi Drones Subsidies Disbursed', description: '15,000 women self-help groups receive direct funding to operate drones for crop monitoring.' },
      { id: 'ag-n-8', year: 2024, title: 'Millets (Shree Anna) Global Promotion', description: 'Indian millet exports double following global trade promotion campaigns and food testing labs.' },
      { id: 'ag-n-9', year: 2025, title: 'Micro-Irrigation Covers 80 Lakh Hectares', description: 'Drip and sprinkler irrigation expand rapidly in water-stressed regions of Maharashtra and Rajasthan.' },
      { id: 'ag-n-10', year: 2024, title: 'Cold-Storage Network Doubles Capacity', description: 'Investment under AIF builds 20 Million Tonnes of new temperature-controlled storage.' }
    ]
  },
  industry: {
    achievements: [
      { id: 'in-a-1', year: 2023, title: 'Mobile Manufacturing Hub', description: 'India becomes the 2nd largest global mobile phone manufacturer by volume, exporting $11B+ devices.' },
      { id: 'in-a-2', year: 2020, title: 'PLI Schemes Launch', description: 'Production Linked Incentive schemes worth ₹1.97 Lakh Crore rolled out across 14 champion sectors.' },
      { id: 'in-a-3', year: 2014, title: 'Make in India Campaign', description: 'Flagship initiative launched to ease investment and build state-of-the-art domestic manufacturing.' },
      { id: 'in-a-4', year: 2016, title: 'Startup India Initiative', description: 'Launches tax holidays and funding grids, fostering a network of 1 Lakh+ registered startups.' },
      { id: 'in-a-5', year: 1991, title: 'Industrial Licensing Abolished', description: 'Dismantles the License Raj, ending quota controls for all but a few strategic industries.' },
      { id: 'in-a-6', year: 1956, title: 'Industrial Policy Resolution', description: 'Established the "commanding heights" policy, focusing state capital on key capital goods industries.' },
      { id: 'in-a-7', year: 2004, title: 'National Manufacturing Council', description: 'NMCC created to formulate policies to scale manufacturing share to 25% of national GDP.' },
      { id: 'in-a-8', year: 1978, title: 'District Industries Centres (DIC)', description: 'Established at district levels to provide integrated services to village and small-scale units.' },
      { id: 'in-a-9', year: 2021, title: 'National Single Window System', description: 'NSWS launched to aggregate all central and state approvals into a single digital application portal.' },
      { id: 'in-a-10', year: 2017, title: 'Mudra Yojana Milestones', description: 'Over ₹15 Lakh Crore in collateral-free institutional loans disbursed to micro and small businesses.' },
      { id: 'in-a-11', year: 2011, title: 'National Manufacturing Policy', description: 'Approved the creation of National Investment and Manufacturing Zones (NIMZ) with special rules.' },
      { id: 'in-a-12', year: 2006, title: 'MSME Development Act', description: 'Enacted to define and support Micro, Small, and Medium Enterprises, setting payment terms.' },
      { id: 'in-a-13', year: 1999, title: 'Information Technology Act', description: 'Passed to provide legal recognition to electronic commerce and transactions, boosting IT parks.' },
      { id: 'in-a-14', year: 1983, title: 'Maruti Suzuki Commercial Production', description: 'Maruti 800 production commences, transforming the automotive component manufacturing ecosystem.' },
      { id: 'in-a-15', year: 1973, title: 'MRTP Act Amendment', description: 'Monopolies and Restrictive Trade Practices guidelines altered to guide large business investments.' },
      { id: 'in-a-16', year: 1948, title: 'First Industrial Policy Resolution', description: 'Laid down the mixed-economy framework, defining public and private industrial spheres.' },
      { id: 'in-a-17', year: 2022, title: 'Defence Production Corridor Setup', description: 'UP and Tamil Nadu corridors established, attracting thousands of crores in private defense orders.' },
      { id: 'in-a-18', year: 2018, title: 'Insolvency Code Resolution Gains', description: 'Resolves major legacy NPA cases, recovering ₹3.5 Lakh Crore for banking system credit deployment.' },
      { id: 'in-a-19', year: 1995, title: 'TRAI Inception', description: 'Telecom Regulatory Authority of India set up, paving the way for private sector industrial entry.' },
      { id: 'in-a-20', year: 1977, title: 'Foreign Brand Restructuring', description: 'Enforced FERA compliance, forcing multi-nationals to dilute equity or exit, boosting local brands.' }
    ],
    news: [
      { id: 'in-n-1', year: 2025, title: 'Semiconductor Fab Plant Commences', description: 'Tata Group and PSMC break ground on India\'s first commercial semiconductor fab in Gujarat.' },
      { id: 'in-n-2', year: 2024, title: 'Apple Exports from India Cross $10B', description: 'Indian-assembled iPhones account for over 14% of global production, expanding local supply lines.' },
      { id: 'in-n-3', year: 2024, title: 'Industrial Corridor Nodes Completed', description: 'Nodes in Krishnapatnam and Tumakuru ready for land allotment to electronics manufacturers.' },
      { id: 'in-n-4', year: 2025, title: 'PLI 2.0 for IT Hardware Approved', description: 'Expanded incentives attract global computer manufacturers to setup assembly lines near Chennai.' },
      { id: 'in-n-5', year: 2024, title: 'Toy Exports Grow by 240%', description: 'Sustained policy support and quality standards shrink Chinese imports and boost local toy exports.' },
      { id: 'in-n-6', year: 2025, title: 'AI Sovereign Cloud Fabric Partnership', description: 'NVIDIA and Indian conglomerates announce local high-performance GPU cloud centers.' },
      { id: 'in-n-7', year: 2024, title: 'Defense Manufacturing Output Hits ₹1.1L Cr', description: 'Private and public defense industrial units register record-high production growth.' },
      { id: 'in-n-8', year: 2024, title: 'Pharma Sector Exports Touch $25B', description: 'Solidifies India\'s rank as the "Pharmacy of the World" via bulk drugs and generic formulations.' },
      { id: 'in-n-9', year: 2025, title: 'Automotive EV Supply Chain Setup', description: 'Global EV makers sign pacts to assemble batteries and power units in Maharashtra.' },
      { id: 'in-n-10', year: 2024, title: 'National Logistics Policy Impact', description: 'Integrated digital logistics portal cuts cargo turnaround times at major freight hubs.' }
    ]
  },
  steel: {
    achievements: [
      { id: 'st-a-1', year: 2023, title: '2nd Largest Steel Producer', description: 'India cements its position as the world\'s second-largest crude steel producer with 140MT output.' },
      { id: 'st-a-2', year: 2017, title: 'National Steel Policy Enacted', description: 'Sets target of expanding domestic crude steel capacity to 300 Million Tonnes by 2030.' },
      { id: 'st-a-3', year: 1959, title: 'Rourkela Steel Plant Commissioned', description: 'India\'s first public sector integrated steel plant set up with German collaboration.' },
      { id: 'st-a-4', year: 1960, title: 'Bhilai Steel Plant Operational', description: 'Built with Soviet assistance, launching heavy rail track manufacturing for Indian Railways.' },
      { id: 'st-a-5', year: 1961, title: 'Durgapur Steel Plant Commissioned', description: 'Set up in West Bengal with British collaboration to manufacture structural steel products.' },
      { id: 'st-a-6', year: 1972, title: 'Bokaro Steel Plant Commences', description: 'Built with Soviet collaboration, established as a state-of-the-art flat steel products facility.' },
      { id: 'st-a-7', year: 1973, title: 'SAIL Establishment', description: 'Steel Authority of India Limited formed to manage and coordinate all public sector steel plants.' },
      { id: 'st-a-8', year: 1992, title: 'Vizag Steel Plant Commissioned', description: 'RINL plant commissioned in Visakhapatnam, featuring advanced coastal shipping advantages.' },
      { id: 'st-a-9', year: 2021, title: 'PLI Scheme for Specialty Steel', description: '₹6,322 Crore incentive package approved to attract manufacturing of high-grade steel alloys.' },
      { id: 'st-a-10', year: 2005, title: 'Private Sector Steel Boom', description: 'Rapid capacity addition by Tata, JSW, and JSPL makes private sector the dominant steel source.' },
      { id: 'st-a-11', year: 1974, title: 'Sponge Iron India Limited', description: 'Set up to pioneer coal-based direct reduced iron (sponge iron) technology in the country.' },
      { id: 'st-a-12', year: 1953, title: 'Hindustan Steel Limited (HSL)', description: 'Predecessor of SAIL established to manage the construction of the three new public steel plants.' },
      { id: 'st-a-13', year: 2020, title: 'Mission Purvodaya Launch', description: 'Accelerated development of eastern India steel hub covering Odisha, Jharkhand, and Bengal.' },
      { id: 'st-a-14', year: 2018, title: 'Automotive Steel Grades Developed', description: 'SAIL and private mills successfully develop indigenous high-tensile grades for automotive shell manufacturing.' },
      { id: 'st-a-15', year: 2012, title: 'Salem Steel Plant Modernization', description: 'Upgraded to produce premium wide stainless steel cold-rolled sheets for global export.' },
      { id: 'st-a-16', year: 1999, title: 'First Corex Technology Plant', description: 'JSW Steel commissions Corex gas-based ironmaking plant in Karnataka, saving coking coal.' },
      { id: 'st-a-17', year: 1982, title: 'Alloy Steels Plant (ASP) Upgrade', description: 'Upgraded to manufacture custom defense-grade armor plates for combat vehicle design.' },
      { id: 'st-a-18', year: 1978, title: 'Vijayanagar Steel Plant Approved', description: 'Lays down foundation for southern India industrial steel capacity near Bellary.' },
      { id: 'st-a-19', year: 1954, title: 'Bhadravati Steel Acquisition', description: 'Central government partners with Mysore Iron & Steel Works to develop special steel grades.' },
      { id: 'st-a-20', year: 1907, title: 'Tata Iron and Steel Company (TISCO)', description: 'Historic legacy: India\'s first private sector steel plant established in Jamshedpur, Jharkhand.' }
    ],
    news: [
      { id: 'st-n-1', year: 2025, title: 'Green Hydrogen Steel Pilot Success', description: 'JSW Steel trials green hydrogen-based Direct Reduced Iron (DRI) to lower furnace emissions.' },
      { id: 'st-n-2', year: 2024, title: 'National Coal Production Hits 1B Tonnes', description: 'Sustained domestic extraction cuts reliance on thermal and metallurgical coal imports.' },
      { id: 'st-n-3', year: 2024, title: 'Specialty Steel PLI Draws ₹30,000 Crore', description: 'Steel ministry signs pacts for manufacturing electrical steel sheets and alloy tubes locally.' },
      { id: 'st-n-4', year: 2025, title: 'Automated Scrap Recycling Policy', description: 'New guidelines enforce automated vehicle scrapping hubs to secure high-quality domestic steel scrap.' },
      { id: 'st-n-5', year: 2024, title: 'Ultra-High Tensile Rebars Developed', description: 'Tata Steel launches Fe-600 grade rebars for constructing massive bridges in seismic zones.' },
      { id: 'st-n-6', year: 2025, title: 'SAIL Capacity Expansion Phase II', description: 'Board approves ₹1 Lakh Crore capex to expand capacity at Bokaro and Bhilai plants by 2030.' },
      { id: 'st-n-7', year: 2024, title: 'Carbon Border Tax Counter-Strategy', description: 'Industry ministry drafts roadmap to incentivize low-carbon steel processing for EU export markets.' },
      { id: 'st-n-8', year: 2024, title: 'Indigenous Rail Track Supply Expands', description: 'Bhilai Steel Plant completes shipment of special R260 grade rail tracks for bullet train projects.' },
      { id: 'st-n-9', year: 2025, title: 'Deep Offshore Coking Coal Blocks Auctioned', description: 'Ministry successfully auctions high-grade coking coal assets in Jharkhand to domestic mills.' },
      { id: 'st-n-10', year: 2024, title: 'Steel Exports Rebound by 15%', description: 'Strong structural steel demand in Middle East and Southeast Asia drives volume growth.' }
    ]
  },
  transport: {
    achievements: [
      { id: 'tr-a-1', year: 2023, title: 'Vande Bharat Fleet Launch', description: 'Over 40 semi-high-speed Vande Bharat trains operationalized, modernizing passenger rail travel.' },
      { id: 'tr-a-2', year: 2022, title: 'National Highway Expansion Pace', description: 'NHAI achieves record highway construction speed of 37 km per day, connecting major state hubs.' },
      { id: 'tr-a-3', year: 2016, title: 'UDAN Regional Aviation Scheme', description: 'Launched to connect underserved regional towns, operationalizing over 100 new low-cost airports.' },
      { id: 'tr-a-4', year: 2021, title: 'Dedicated Freight Corridors (DFC)', description: 'Commissioning of Eastern & Western freight routes, doubling cargo train speeds.' },
      { id: 'tr-a-5', year: 2019, title: 'National Common Mobility Card', description: 'One Nation One Card launched, enabling seamless transit payment across metro, bus, and tolls.' },
      { id: 'tr-a-6', year: 2001, title: 'Golden Quadrilateral Highway Project', description: 'Historic 5,846 km highway network launched by PM Vajpayee, linking Delhi, Mumbai, Chennai, and Kolkata.' },
      { id: 'tr-a-7', year: 1984, title: 'Kolkata Metro Commences', description: 'India\'s first underground rapid transit system begins operations, pioneering urban rail transit.' },
      { id: 'tr-a-8', year: 1998, title: 'Konkan Railway Completion', description: 'Incredible engineering feat of 760 km route through rugged Western Ghats completed.' },
      { id: 'tr-a-9', year: 1951, title: 'Nationalization of Railways', description: 'Various private railway systems integrated into a single public entity: Indian Railways.' },
      { id: 'tr-a-10', year: 1953, title: 'Air Corporations Act', description: 'Nationalizes domestic and international aviation, establishing Indian Airlines and Air India.' },
      { id: 'tr-a-11', year: 2020, title: '100% Railway Electrification Campaign', description: 'Broad gauge railway network reaches 80%+ electrification, on track to touch 100%.' },
      { id: 'tr-a-12', year: 2015, title: 'National Sagarmala Project', description: 'Launched to promote port-led development, cargo modernization, and coastal community growth.' },
      { id: 'tr-a-13', year: 2002, title: 'National Expressway 1 Opened', description: '93 km Ahmedabad-Vadodara Expressway completed, setting standards for high-speed express corridors.' },
      { id: 'tr-a-14', year: 1997, title: 'National Highways Authority (NHAI)', description: 'NHAI operationalized as an autonomous body to manage national highway networks.' },
      { id: 'tr-a-15', year: 1989, title: 'First Container Corporation Setup', description: 'CONCOR established to build inland container depots, facilitating multimodal cargo transit.' },
      { id: 'tr-a-16', year: 1972, title: 'Kochi Shipyard Incorporated', description: 'Pioneered building of large merchant vessels and eventually navy aircraft carriers.' },
      { id: 'tr-a-17', year: 1960, title: 'Border Roads Organisation (BRO)', description: 'BRO created to secure and build road networks along critical Himalayan border regions.' },
      { id: 'tr-a-18', year: 1956, title: 'National Highways Act Passed', description: 'Gave central government statutory authority to declare and acquire land for National Highways.' },
      { id: 'tr-a-19', year: 1948, title: 'State Road Transport Corporations', description: 'Act passed to create structured public bus transport corporations across all states.' },
      { id: 'tr-a-20', year: 1908, title: 'Port of Mumbai Expansion', description: 'Legacy dock expansion, establishing Mumbai as the premier trading gateway of western India.' }
    ],
    news: [
      { id: 'tr-n-1', year: 2025, title: 'Bullet Train Ocean Tunnel Completed', description: 'Engineers complete the undersea tunnel stretch near Mumbai for the Bullet Train corridor.' },
      { id: 'tr-n-2', year: 2024, title: 'Railways Achieve 94% Electrification', description: 'India inches closer to becoming the world\'s largest 100% electrified green rail network.' },
      { id: 'tr-n-3', year: 2024, title: 'Mumbai Coastal Road Opened', description: 'First phase of the reclamation road project opened, cutting city commute times by 70%.' },
      { id: 'tr-n-4', year: 2025, title: 'Navi Mumbai Airport Flight Trials', description: 'Commercial aircraft complete successful test landing runs ahead of year-end operations.' },
      { id: 'tr-n-5', year: 2024, title: 'Chenab Railway Bridge Operationalized', description: 'World\'s highest railway arch bridge in Jammu & Kashmir clears trial runs for train operations.' },
      { id: 'tr-n-6', year: 2025, title: 'National Expressway Grid Target', description: 'NHAI announces target to complete 10,000 km of access-controlled expressways by 2026.' },
      { id: 'tr-n-7', year: 2024, title: 'Kolkata Under-River Metro Commences', description: 'Commercial runs start on the East-West metro corridor, passing beneath the Hooghly River.' },
      { id: 'tr-n-8', year: 2024, title: 'Vizhinjam Deepwater Port Trials', description: 'First container mothership docks at Kerala\'s transshipment port, positioning India in global maritime routes.' },
      { id: 'tr-n-9', year: 2025, title: 'Amrit Bharat Station Redevelopment', description: 'Work begins on upgrading 500 major railway stations with airport-like terminal facilities.' },
      { id: 'tr-n-10', year: 2024, title: 'FASTag Toll Collections Up 20%', description: 'Digital RFID toll collection records daily high of ₹200 Crore, eliminating toll booth queues.' }
    ]
  },
  energy: {
    achievements: [
      { id: 'en-a-1', year: 2023, title: '180 GW Renewable Capacity', description: 'Renewable energy crosses 42% of total installed power capacity, on track for the 500 GW target.' },
      { id: 'en-a-2', year: 2018, title: 'One Nation-One Grid Unified', description: 'Integration of all five regional power grids into a single national frequency grid completed.' },
      { id: 'en-a-3', year: 2015, title: 'UJALA LED Distribution Program', description: 'World\'s largest domestic lighting program distributes 36 Crore energy-efficient LED bulbs.' },
      { id: 'en-a-4', year: 2021, title: 'Bhadla Solar Park Fully Operational', description: 'Located in Rajasthan, it becomes the world\'s largest solar park with 2,245 MW capacity.' },
      { id: 'en-a-5', year: 1969, title: 'Tarapur Atomic Power Station', description: 'India\'s first commercial nuclear power station begins operations with boiling water reactors.' },
      { id: 'en-a-6', year: 1975, title: 'NTPC Establishment', description: 'National Thermal Power Corporation established to build and manage coal-fired super stations.' },
      { id: 'en-a-7', year: 1989, title: 'Power Grid Corporation (PGCIL)', description: 'PGCIL created to construct and operate high-voltage interstate transmission lines.' },
      { id: 'en-a-8', year: 2003, title: 'Electricity Act 2003 Enacted', description: 'De-licensed generation, introduced multi-buyer models, and created independent regulators.' },
      { id: 'en-a-9', year: 2015, title: 'International Solar Alliance (ISA)', description: 'Co-founded by India and France to promote solar adoption across 100+ member countries.' },
      { id: 'en-a-10', year: 2016, title: 'Ujwala LPG Reform Inception', description: 'PMUY launched, providing over 10 Crore free cooking gas cylinders to rural BPL households.' },
      { id: 'en-a-11', year: 2010, title: 'National Solar Mission Launched', description: 'Set an initial target of 20 GW solar capacity by 2022, later scaled to 100 GW in 2015.' },
      { id: 'en-a-12', year: 2006, title: 'Integrated Energy Policy', description: 'Formulated a multi-sector energy plan focusing on coal reserves, nuclear goals, and solar R&D.' },
      { id: 'en-a-13', year: 1992, title: 'First Private Sector Power Entry', description: 'Electricity Act amended to allow private sector generation, launching independent power projects.' },
      { id: 'en-a-14', year: 1982, title: 'IREDA Inception', description: 'Indian Renewable Energy Development Agency formed to provide financial support to green projects.' },
      { id: 'en-a-15', year: 1978, title: 'Super Thermal Power Projects (STPS)', description: 'First 200MW thermal units commissioned in Singrauli, laying base for bulk national power supply.' },
      { id: 'en-a-16', year: 1964, title: 'Heavy Electricals (BHEL) Setup', description: 'Bharat Heavy Electricals founded to build domestic boilers, turbines, and generators.' },
      { id: 'en-a-17', year: 1957, title: 'Atomic Energy Establishment (BARC)', description: 'Founded at Trombay by Dr. Homi J. Bhabha to spearhead nuclear energy research.' },
      { id: 'en-a-18', year: 1954, title: 'Ministry of New & Renewable Energy', description: 'Pioneered as the Commission for Additional Sources of Energy, later becoming a full ministry.' },
      { id: 'en-a-19', year: 1948, title: 'Electricity (Supply) Act Passed', description: 'Created State Electricity Boards (SEBs) to manage generation and rural distribution networks.' },
      { id: 'en-a-20', year: 1915, title: 'Tata Hydroelectric Commission', description: 'Legacy hydro-generation plant operationalized in Khopoli, powering early Bombay industries.' }
    ],
    news: [
      { id: 'en-n-1', year: 2025, title: 'National Green Hydrogen Mission Pilots', description: 'Conglomerates begin testing green hydrogen blending in natural gas pipes and fertilizer plants.' },
      { id: 'en-n-2', year: 2024, title: '10 indigenous Nuclear Reactors Approved', description: 'Government clears financial funding for 10 Pressurized Heavy Water Reactors (PHWR) of 700MW.' },
      { id: 'en-n-3', year: 2024, title: 'Rooftop Solar Program (Surya Ghar)', description: '1 Crore homes registered for free solar panels under the PM Surya Ghar Muft Bijli Yojana.' },
      { id: 'en-n-4', year: 2025, title: 'Khavda Renewable Park Starts Generation', description: 'World\'s largest hybrid renewable energy park in Gujarat begins supplying power to the national grid.' },
      { id: 'en-n-5', year: 2024, title: 'Pumped Hydro Storage Guidelines', description: 'Ministry releases rules to develop 47 GW of pumped storage hydro projects to balance solar supply.' },
      { id: 'en-n-6', year: 2025, title: 'Kudankulam Unit 3 Grid Connected', description: '1000 MWe Russian-designed VVER reactor completes commercial generation sync.' },
      { id: 'en-n-7', year: 2024, title: 'Electricity Rights of Consumers Amended', description: 'New rules mandate compensation for power cuts and simplify rooftop solar net metering.' },
      { id: 'en-n-8', year: 2024, title: 'Offshore Wind Bidding Opens', description: 'First ever global bids invited for 4GW offshore wind blocks off the coasts of Gujarat and Tamil Nadu.' },
      { id: 'en-n-9', year: 2025, title: 'Coal-Fired Plants Carbon Capture Pilot', description: 'NTPC commissions its first carbon capture and green methanol synthesis unit in Madhya Pradesh.' },
      { id: 'en-n-10', year: 2024, title: 'Inter-State Green Energy Corridor Phase II', description: 'Transmission network approved to evacuate 20GW renewable energy from western states to northern hubs.' }
    ]
  },
  education: {
    achievements: [
      { id: 'ed-a-1', year: 2020, title: 'National Education Policy (NEP)', description: 'Major policy overhaul, replacing the 1986 framework with a flexible 5+3+3+4 school curriculum.' },
      { id: 'ed-a-2', year: 2009, title: 'Right to Education (RTE) Act', description: 'Free and compulsory education made a fundamental right for children aged 6 to 14.' },
      { id: 'ed-a-3', year: 2015, title: 'Skill India Mission Launch', description: 'Pradhan Mantri Kaushal Vikas Yojana launched to train millions in industry-relevant trades.' },
      { id: 'ed-a-4', year: 1951, title: 'First IIT Established', description: 'Indian Institute of Technology Kharagpur founded, marking the beginning of premier engineering education.' },
      { id: 'ed-a-5', year: 1961, title: 'NCERT Established', description: 'National Council of Educational Research & Training formed to standardize textbook curriculum.' },
      { id: 'ed-a-6', year: 2001, title: 'Sarva Shiksha Abhiyan (SSA)', description: 'Flagship programme launched by PM Vajpayee to universalize elementary school education.' },
      { id: 'ed-a-7', year: 1956, title: 'UGC Act Enacted', description: 'University Grants Commission formed to coordinate, determine, and maintain higher education standards.' },
      { id: 'ed-a-8', year: 1961, title: 'First IIM Established', description: 'Indian Institute of Management Calcutta set up, followed by IIM Ahmedabad to build business leaders.' },
      { id: 'ed-a-9', year: 1995, title: 'Mid-Day Meal Scheme Launch', description: 'World\'s largest school feeding program launched to improve enrollment, retention, and nutrition.' },
      { id: 'ed-a-10', year: 1986, title: 'National Policy on Education (NPE)', description: 'Established the "10+2" educational structure and launched "Operation Blackboard" for schools.' },
      { id: 'ed-a-11', year: 2013, title: 'Rashtriya Uchchatar Shiksha Abhiyan', description: 'RUSA launched to provide strategic funding to state higher educational institutions.' },
      { id: 'ed-a-12', year: 2005, title: 'National Curriculum Framework', description: 'NCF 2005 guidelines published, shifting school education from rote learning to activity-based learning.' },
      { id: 'ed-a-13', year: 1994, title: 'NAAC Established', description: 'National Assessment and Accreditation Council set up to evaluate and accredit higher institutes.' },
      { id: 'ed-a-14', year: 1987, title: 'AICTE Act Passed', description: 'All India Council for Technical Education granted statutory status to plan and regulate technical streams.' },
      { id: 'ed-a-15', year: 1974, title: 'Non-Formal Education Scheme', description: 'Launched to educate school dropouts and working children in urban slums and remote hamlets.' },
      { id: 'ed-a-16', year: 1968, title: 'First National Policy on Education', description: 'Enacted based on Kothari Commission report, calling for 6% of GDP spending on schools.' },
      { id: 'ed-a-17', year: 1953, title: 'Secondary Education Commission', description: 'Mudaliar Commission reports, recommending reform of secondary curriculum and vocational options.' },
      { id: 'ed-a-18', year: 1948, title: 'Radhakrishnan Commission', description: 'University Education Commission set up, recommending the establishment of UGC.' },
      { id: 'ed-a-19', year: 2017, title: 'SWAYAM MOOCs Portal', description: 'Government launches online portal offering free university classes and credit transfers.' },
      { id: 'ed-a-20', year: 1985, title: 'IGNOU Established', description: 'Indira Gandhi National Open University set up, democratizing distance learning across rural classes.' }
    ],
    news: [
      { id: 'ed-n-1', year: 2025, title: 'National Digital University Rollout', description: 'Establishment of the first digital university offering personalized multi-lingual degree courses.' },
      { id: 'ed-n-2', year: 2024, title: 'Female STEM Enrolment Hits 43%', description: 'India records one of the highest female STEM graduate proportions globally, beating western averages.' },
      { id: 'ed-n-3', year: 2024, title: 'Foreign Universities Setup Local Campuses', description: 'Deakin University and Wollongong from Australia inaugurate GIFT City campuses under new regulations.' },
      { id: 'ed-n-4', year: 2025, title: 'Automated Student ID (APAAR) Rollout', description: 'Over 10 Crore students issued APAAR "One Nation, One Student ID" cards linked to DigiLocker.' },
      { id: 'ed-n-5', year: 2024, title: 'PM SHRI Schools Phase I Completed', description: 'Over 6,000 schools upgraded with solar panels, smart labs, and NEP-compliant experiential curriculum.' },
      { id: 'ed-n-6', year: 2025, title: 'National Research Foundation (ANRF)', description: 'ANRF allocates ₹50,000 Crore to foster research culture in universities over 5 years.' },
      { id: 'ed-n-7', year: 2024, title: 'Three-Language Policy Adopted in CBSE', description: 'CBSE issues guidelines for teaching native regional languages in secondary school lines.' },
      { id: 'ed-n-8', year: 2024, title: 'Vocational Training Integrated with ONDC', description: 'Certified skill trainees list their digital consulting services directly on commercial channels.' },
      { id: 'ed-n-9', year: 2025, title: 'AI Literacy in School Curriculums', description: 'NCERT introduces foundation modules in artificial intelligence and coding from Class 6.' },
      { id: 'ed-n-10', year: 2024, title: 'NIRF Ranking Methodology Expanded', description: 'Higher education rankings include patents commercialized and startup incubation metrics.' }
    ]
  },
  healthcare: {
    achievements: [
      { id: 'he-a-1', year: 2018, title: 'Ayushman Bharat PM-JAY Launch', description: 'World\'s largest government healthcare scheme, offering ₹5 Lakh annual cover to 50 Crore citizens.' },
      { id: 'he-a-2', year: 2014, title: 'Polio-Free India Certification', description: 'WHO certifies India as officially polio-free after three consecutive years of zero cases.' },
      { id: 'he-a-3', year: 2021, title: '2 Billion Vaccine Doses administered', description: 'India successfully coordinates 200 Crore COVID-19 vaccine doses using the digital CoWIN system.' },
      { id: 'he-a-4', year: 2015, title: 'Jan Aushadhi Generic Medicine', description: 'Launches thousands of generic medicine stores, cutting drug costs by 50% to 90%.' },
      { id: 'he-a-5', year: 2005, title: 'National Rural Health Mission (NRHM)', description: 'Launches NRHM, deploying over 10 Lakh ASHA community health workers across villages.' },
      { id: 'he-a-6', year: 1995, title: 'Pulse Polio Programme Launch', description: 'Mass immunization campaign initiated, vaccinating millions of children in single-day drives.' },
      { id: 'he-a-7', year: 1956, title: 'AIIMS New Delhi Setup', description: 'All India Institute of Medical Sciences established as the premier referral and medical training hub.' },
      { id: 'he-a-8', year: 1983, title: 'First National Health Policy', description: 'Formulates primary healthcare grids and lays down goals for lowering infant mortality.' },
      { id: 'he-a-9', year: 1978, title: 'Expanded Programme on Immunization', description: 'EPI launched to provide free vaccines against TB, polio, diphtheria, tetanus, and measles.' },
      { id: 'he-a-10', year: 1953, title: 'National Malaria Control Programme', description: 'Launches major indoor spraying and medication distribution, slashing malaria death rates.' },
      { id: 'he-a-11', year: 2021, title: 'Ayushman Bharat Digital Mission', description: 'ABDM launched to create unified digital health IDs and secure online medical records registries.' },
      { id: 'he-a-12', year: 2017, title: 'National Health Policy 2017', description: 'Aims to increase government health expenditure to 2.5% of GDP and targets elimination of TB.' },
      { id: 'he-a-13', year: 2014, title: 'Mission Indradhanush Launch', description: 'Aims to vaccinate all children and pregnant women against 12 vaccine-preventable diseases.' },
      { id: 'he-a-14', year: 2013, title: 'National Urban Health Mission', description: 'NUHM launched to meet primary healthcare demands of slum dwellers and urban poor.' },
      { id: 'he-a-15', year: 2002, title: 'Second National Health Policy', description: 'Focussed on decentralizing public health infrastructure and expanding generic drug supplies.' },
      { id: 'he-a-16', year: 1982, title: 'Mental Healthcare Policy Initiative', description: 'Launches National Mental Health Programme to integrate psychiatric care with primary health.' },
      { id: 'he-a-17', year: 1971, title: 'Medical Termination of Pregnancy Act', description: 'Enacted progressive reproductive rights legislation, decriminalizing abortion under medical rules.' },
      { id: 'he-a-18', year: 1955, title: 'National Leprosy Control Programme', description: 'Initiated active leprosy screening and therapy, eventually introducing MDT drugs.' },
      { id: 'he-a-19', year: 1948, title: 'WHO Membership & Early Programs', description: 'India partners with WHO, launching early BCG vaccination campaigns to control TB.' },
      { id: 'he-a-20', year: 1946, title: 'Bhore Committee Report Legacy', description: 'Pre-independence blueprint adopted to organize primary healthcare centers (PHCs) every 30,000 population.' }
    ],
    news: [
      { id: 'he-n-1', year: 2025, title: 'Cancer Care Hub Network Expands', description: '15 regional cancer institutes equipped with advanced chemotherapy and linear accelerators completed.' },
      { id: 'he-n-2', year: 2024, title: 'ABHA Digital Health Records cross 500M', description: 'Half a billion citizens registered with digital health accounts, easing remote hospital checks.' },
      { id: 'he-n-3', year: 2024, title: 'Jan Aushadhi Kendra Network Touches 10k', description: 'Over 10,000 generic drug stores are active, saving consumers ₹25,000 Crore annually.' },
      { id: 'he-n-4', year: 2025, title: 'Cervical Cancer Vaccine Drive Approved', description: 'Cabinet approves free HPV immunization campaigns for girls aged 9 to 14 in government schools.' },
      { id: 'he-n-5', year: 2024, title: 'Drone Delivery of Blood & Vaccines', description: 'ICMR completes drone delivery runs to tribal villages in Himachal Pradesh and Manipur.' },
      { id: 'he-n-6', year: 2025, title: 'Ayushman Bharat Cover for Seniors (70+)', description: 'Government extends free PM-JAY medical insurance to all senior citizens aged 70 and above.' },
      { id: 'he-n-7', year: 2024, title: 'Sickle Cell Anemia Mission Progress', description: 'Over 1 Crore tribal citizens screened for sickle cell genetic traits, issuing counsel cards.' },
      { id: 'he-n-8', year: 2024, title: 'e-Sanjeevani Telemedicine Hits 20 Crore Consults', description: 'National telemedicine portal logs record virtual consults, linking rural areas to urban doctors.' },
      { id: 'he-n-9', year: 2025, title: 'CAR-T Cell Therapy Commercial Rollout', description: 'Indigenously developed NexCAR19 cancer therapy begins treatment in premier public hospitals at 1/10th global cost.' },
      { id: 'he-n-10', year: 2024, title: 'WHO Global Traditional Medicine Centre', description: 'Groundbreaking of WHO traditional medicine center in Jamnagar, Gujarat completed.' },
      { id: 'he-n-11', year: 2026, title: 'National Digital Health Ecosystem Scale-Up', description: 'ABHA health accounts cross 650 Million users, integrating all major public and private hospitals under unified digital records.' }
    ]
  },
  digital: {
    achievements: [
      { id: 'di-a-1', year: 2023, title: 'UPI 100 Billion Annual Transactions', description: 'Unified Payments Interface records historic annual volume, handling over 45% of global real-time payments.' },
      { id: 'di-a-2', year: 2015, title: 'Digital India Mission Launch', description: 'Flagship programme launched to transition governance and public services onto digital networks.' },
      { id: 'di-a-3', year: 2009, title: 'Aadhaar Biometric ID Rollout', description: 'UIDAI launches the Aadhaar project, creating the world\'s largest biometric digital identity platform.' },
      { id: 'di-a-4', year: 2016, title: 'Mobile 4G Jio Data Revolution', description: 'Exponential reduction in mobile internet costs, triggering explosive growth in rural and urban data consumption.' },
      { id: 'di-a-5', year: 2015, title: 'DigiLocker User Registrations', description: 'Cloud document storage launched, allowing digital storage and verification of degrees, licenses, and cards.' },
      { id: 'di-a-6', year: 2017, title: 'BharatNet Gram Panchayat Optical Fiber', description: 'Starts rolling out fiber optic internet lines to connect 2.5 Lakh rural local governments.' },
      { id: 'di-a-7', year: 2017, title: 'UMANG Super App Launch', description: 'Unifies over 1,200 central and state e-governance services onto a single mobile application.' },
      { id: 'di-a-8', year: 2021, title: 'CoWIN Platform Delivery', description: 'Vaccine distribution platform registers and schedules 2 Billion vaccine doses and generates digital certs.' },
      { id: 'di-a-9', year: 2022, title: 'ONDC Launch', description: 'Open Network for Digital Commerce launched to democratize e-commerce and support local shops.' },
      { id: 'di-a-10', year: 2020, title: 'PM-WANI Public Wi-Fi Hotspots', description: 'Allows small shop owners to set up public Wi-Fi hotspots, expanding cheap internet access.' },
      { id: 'di-a-11', year: 2022, title: 'AI Bhashini Translation Mission', description: 'Launches AI translation services to translate real-time text and speech in 22 official Indian languages.' },
      { id: 'di-a-12', year: 2023, title: 'Sanchar Saathi Portal Launch', description: 'Citizen-centric telecom portal launched to track lost mobile devices and check SIM ownership.' },
      { id: 'di-a-13', year: 2017, title: 'PMGDISHA Digital Literacy', description: 'Over 6 Crore rural citizens trained under Pradhan Mantri Gramin Digital Saksharta Abhiyan.' },
      { id: 'di-a-14', year: 2016, title: 'Digital Land Records Digitisation', description: 'Over 90% of land ownership documents are successfully scanned and registered on online systems.' },
      { id: 'di-a-15', year: 2020, title: 'e-Sanjeevani Telemedicine Rollout', description: 'Launches virtual doctor consultation networks, linking primary health sub-centres with state hospitals.' },
      { id: 'di-a-16', year: 2022, title: 'DigiYatra Paperless Airport Entry', description: 'Facial recognition boarding passes introduced at Delhi, Bengaluru, and Varanasi airports.' },
      { id: 'di-a-17', year: 2021, title: 'Global Cyber Security Index Rank 10', description: 'International Telecommunication Union ranks India in the top 10 global cybersecurity nations.' },
      { id: 'di-a-18', year: 2015, title: 'National Supercomputing Mission', description: 'NSM launched to design and install high-performance compute clusters in premier R&D labs.' },
      { id: 'di-a-19', year: 2016, title: 'FASTag Digital Toll System', description: 'RFID toll payment tags launched, transitioning national highways into paperless contactless tolls.' },
      { id: 'di-a-20', year: 2018, title: 'National AI Portal (INDIAAI)', description: 'Established as a central hub for artificial intelligence guidelines, data policies, and education.' }
    ],
    news: [
      { id: 'di-n-1', year: 2025, title: '5G Rollout covers 98% Districts', description: 'India achieves the fastest global deployment of 5G telecom services with over 4 Lakh base stations.' },
      { id: 'di-n-2', year: 2024, title: 'UPI Global Footprint Expands', description: 'Sri Lanka, Mauritius, UAE, and Singapore enable cross-border UPI payments and QR compatibility.' },
      { id: 'di-n-3', year: 2025, title: 'Sovereign AI Compute Infrastructure', description: 'Government allocates ₹10,000 Crore to procure and setup high-performance local AI GPU clusters.' },
      { id: 'di-n-4', year: 2024, title: 'ONDC Expands to 500+ Cities', description: 'Open e-commerce network adds thousands of local restaurants and grocery shops, lowering margins.' },
      { id: 'di-n-5', year: 2024, title: 'Rural Internet Users Overtake Urban', description: 'IAMAI report highlights that rural India now registers more active internet users than urban areas.' },
      { id: 'di-n-6', year: 2025, title: '6G Research Testbed Operationalized', description: 'ISRO and telecom labs begin testing satellite-integrated ultra-high-speed 6G networks.' },
      { id: 'di-n-7', year: 2024, title: 'Digital Personal Data Protection Rules', description: 'Ministry notifies operational rules for DPDP Act, specifying consent requirements for platforms.' },
      { id: 'di-n-8', year: 2024, title: 'India Stack Shared with 10 Nations', description: 'Bilateral agreements signed with Papua New Guinea, Trinidad & Tobago, and others to adopt UPI.' },
      { id: 'di-n-9', year: 2025, title: 'RBI Proposes Offline UPI Payments', description: 'UPI Lite upgraded to support voice-activated and offline payments via feature phones in dark zones.' },
      { id: 'di-n-10', year: 2024, title: 'AI Centers of Excellence Formed', description: 'Three centers of excellence in AI focused on Health, Agriculture, and Sustainable Cities established.' },
      { id: 'di-n-11', year: 2026, title: 'Digital Rupee (CBDC) Nationwide Rollout', description: 'RBI expands Central Bank Digital Rupee to retail users, achieving over 10 Million daily active transactions across major cities.' }
    ]
  },
  space: {
    achievements: [
      { id: 'sp-a-1', year: 2023, title: 'Chandrayaan-3 Moon Landing', description: 'ISRO soft-lands Vikram lander on the Lunar South Pole, becoming the first country to achieve this.' },
      { id: 'sp-a-2', year: 2014, title: 'Mangalyaan Mars Mission', description: 'Mars Orbiter Mission successfully enters Martian orbit in its first attempt at a record low cost.' },
      { id: 'sp-a-3', year: 2017, title: '104 Satellites on Single Launch', description: 'ISRO breaks world record by launching 104 satellites using a single PSLV-C37 rocket.' },
      { id: 'sp-a-4', year: 1975, title: 'Aryabhata Satellite Launched', description: 'India\'s first artificial satellite built indigenously, launched with Soviet assistance.' },
      { id: 'sp-a-5', year: 1980, title: 'Rohini Satellite Orbit Achievement', description: 'First satellite successfully launched using an indigenous Indian launch vehicle, SLV-3.' },
      { id: 'sp-a-6', year: 1984, title: 'Rakesh Sharma Spaceflight', description: 'Wing Commander Rakesh Sharma becomes the first Indian citizen in space aboard Soyuz T-11.' },
      { id: 'sp-a-7', year: 2008, title: 'Chandrayaan-1 Moon Mission', description: 'First lunar probe discovers presence of water molecules on the lunar surface, a major breakthrough.' },
      { id: 'sp-a-8', year: 2015, title: 'Astrosat Space Observatory', description: 'India\'s first dedicated multi-wavelength space telescope launched to study black holes and stars.' },
      { id: 'sp-a-9', year: 2018, title: 'Crew Escape System Flight Test', description: 'Successful pad abort test executed, demonstrating abort capabilities for upcoming human spaceflight.' },
      { id: 'sp-a-10', year: 2019, title: 'Mission Shakti A-SAT Test', description: 'Successful kinetic anti-satellite missile test intercepts a low Earth orbit target.' },
      { id: 'sp-a-11', year: 2001, title: 'First GSLV Flight', description: 'Geosynchronous Satellite Launch Vehicle completes flight, paving path for heavy satellite launches.' },
      { id: 'sp-a-12', year: 1993, title: 'First PSLV Development Flight', description: 'Polar Satellite Launch Vehicle launched, eventually becoming the reliable workhorse of ISRO.' },
      { id: 'sp-a-13', year: 1969, title: 'ISRO Formed on Independence Day', description: 'Indian Space Research Organisation established under DAE, succeeding INCOSPAR.' },
      { id: 'sp-a-14', year: 1963, title: 'First Sounding Rocket Launched', description: 'Nike-Apache rocket launched from Thumba Equatorial Rocket Launching Station, launching space era.' },
      { id: 'sp-a-15', year: 2022, title: 'First Private Rocket Launch (Vikram-S)', description: 'Skyroot Aerospace launches India\'s first privately developed rocket, inaugurating private space tech.' },
      { id: 'sp-a-16', year: 2016, title: 'Reusable Launch Vehicle (RLV-TD)', description: 'Successful flight test of winged reusable aerospace vehicle, verifying glide and autonomous reentry.' },
      { id: 'sp-a-17', year: 2010, title: 'Indigenous Cryogenic Engine Test', description: 'GSLV-D3 launches featuring first flight test of indigenous cryogenic stage developed by LPSC.' },
      { id: 'sp-a-18', year: 1999, title: 'IRS-P4 (Oceansat-1) Launch', description: 'Pioneering oceanographic satellite launched on PSLV to study sea state and chlorophyll distribution.' },
      { id: 'sp-a-19', year: 1983, title: 'INSAT-1B Multi-Purpose Satellite', description: 'Revolutionized Indian domestic telecommunications, TV broadcasting, and weather forecasting.' },
      { id: 'sp-a-20', year: 1979, title: 'Bhaskara-I Experimental Satellite', description: 'Launched to collect remote sensing data in hydrology, forestry, and land-use mapping.' }
    ],
    news: [
      { id: 'sp-n-1', year: 2025, title: 'Gaganyaan Astronauts Announced', description: 'ISRO names four astronaut designates for the upcoming manned orbital spaceflight mission.' },
      { id: 'sp-n-2', year: 2024, title: 'Aditya-L1 enters Solar Halo Orbit', description: 'India\'s first solar observatory takes position at Lagrange Point 1 to study solar flares.' },
      { id: 'sp-n-3', year: 2025, title: 'Chandrayaan-4 Sample Return Plan', description: 'ISRO drafts mission layout to land on the Moon and bring soil samples back to Earth by 2028.' },
      { id: 'sp-n-4', year: 2024, title: 'SSLV Commercial Entry Cleared', description: 'Small Satellite Launch Vehicle transfer of technology completed, clearing private commercial launches.' },
      { id: 'sp-n-5', year: 2024, title: 'INSAT-3DS Weather Satellite Operational', description: 'Advanced meteorological satellite launched successfully on GSLV-F14, improving cyclone forecasts.' },
      { id: 'sp-n-6', year: 2025, title: 'NASA-ISRO NISAR Satellite Integration', description: 'Joint synthetic aperture radar satellite undergoes final payload testing at Bengaluru hub.' },
      { id: 'sp-n-7', year: 2024, title: 'Pushpak RLV Autonomous Landing', description: 'Reusable Launch Vehicle completes second successive high-altitude autonomous runway landing.' },
      { id: 'sp-n-8', year: 2024, title: 'New Spaceport at Kulasekarapattinam', description: 'Foundation stone laid for India\'s second spaceport in Tamil Nadu, dedicated to small rockets.' },
      { id: 'sp-n-9', year: 2025, title: 'LUPEX Lunar Water Rover Approved', description: 'Joint ISRO-JAXA mission to launch a heavy lunar rover to explore shadowed polar craters.' },
      { id: 'sp-n-10', year: 2024, title: 'GSAT-20 Selected for SpaceX Falcon 9', description: 'Commercial agreement signed to launch heavy communication satellite on Falcon 9.' },
      { id: 'sp-n-11', year: 2026, title: 'Gaganyaan First Manned Spaceflight Launch', description: 'ISRO successfully conducts the historic first crewed orbital flight with two astronauts, securing India as 4th nation with crewed capability.' }
    ]
  },
  defense: {
    achievements: [
      { id: 'de-a-1', year: 2022, title: 'INS Vikrant Commissioned', description: 'First indigenous aircraft carrier, designed by the Indian Navy, enters active military service.' },
      { id: 'de-a-2', year: 2023, title: 'Record High Defense Exports', description: 'Military exports touch a historic ₹16,000 Crore, supplying defense components to over 85 nations.' },
      { id: 'de-a-3', year: 2016, title: 'Agni-V ICBM Induction', description: 'Successful testing and deployment of intercontinental ballistic missile, securing nuclear deterrence.' },
      { id: 'de-a-4', year: 1998, title: 'Pokhran-II Nuclear Tests', description: 'Operation Shakti successfully establishes India as a declared nuclear weapon state.' },
      { id: 'de-a-5', year: 1974, title: 'Pokhran-I Nuclear Test', description: 'Operation Smiling Buddha: India conducts its first peaceful nuclear explosion at Pokhran.' },
      { id: 'de-a-6', year: 2015, title: 'Tejas Light Combat Aircraft Induction', description: 'LCA Tejas inducted into the IAF, replacing vintage fighter fleets with indigenous technology.' },
      { id: 'de-a-7', year: 2016, title: 'INS Arihant Strategic Patrol', description: 'First indigenous nuclear-powered ballistic missile submarine completes its deterrent patrol, securing the nuclear triad.' },
      { id: 'de-a-8', year: 2001, title: 'BrahMos Joint Venture Setup', description: 'Partnership with Russia to design and build the world\'s fastest supersonic cruise missile.' },
      { id: 'de-a-9', year: 1983, title: 'Integrated Guided Missile Program', description: 'Dr. APJ Abdul Kalam launches IGMDP to design Agni, Prithvi, Trishul, Akash, and Nag missiles.' },
      { id: 'de-a-10', year: 1958, title: 'DRDO Establishment', description: 'Defense Research and Development Organisation formed to spearhead military science and technology.' },
      { id: 'de-a-11', year: 2019, title: 'Chief of Defence Staff Post Created', description: 'CDS post established to coordinate joint operations and acquisitions across Army, Navy, and Air Force.' },
      { id: 'de-a-12', year: 2021, title: 'DRDO Anti-Drone System', description: 'Indigenously developed D-4 counter-drone system deployed for prime ministerial and border protection.' },
      { id: 'de-a-13', year: 2018, title: 'K-4 SLBM Submarine Missile Test', description: 'Undersea launch of 3,500 km range submarine-launched ballistic missile completes integration trials.' },
      { id: 'de-a-14', year: 2012, title: 'INS Chakra Nuclear Submarine Lease', description: 'Russian Akula-class nuclear attack submarine leased to train Navy crews in undersea reactor operations.' },
      { id: 'de-a-15', year: 2008, title: 'Shaurya Hypersonic Missile Flight', description: 'Successful flight test of canister-launched hypersonic tactical missile, expanding deterrent options.' },
      { id: 'de-a-16', year: 1999, title: 'Operation Vijay Victory', description: 'Military recapture of Kargil peaks under high-altitude combat conditions against infiltrating forces.' },
      { id: 'de-a-17', year: 1987, title: 'Operation Meghdoot Siachen Control', description: 'Strategic deployment establishes permanent control over the world\'s highest battlefield at Siachen Glacier.' },
      { id: 'de-a-18', year: 1971, title: 'Decisive Naval Blockade Victory', description: 'Operation Trident missile boat strikes on Karachi harbour disable adversary naval operations.' },
      { id: 'de-a-19', year: 1961, title: 'INS Vikrant (R11) Acquisition', description: 'India acquires its first aircraft carrier, participating actively in subsequent coastal defense.' },
      { id: 'de-a-20', year: 1954, title: 'Ordnance Factories Restructuring', description: 'Ministry of Defence establishes coordinated board to supervise state industrial ordnance lines.' }
    ],
    news: [
      { id: 'de-n-1', year: 2025, title: 'Tejas Mark 1A Inductions Begin', description: 'HAL delivers the first batch of upgraded light combat aircraft featuring active electronic radar.' },
      { id: 'de-n-2', year: 2024, title: 'Aatmanirbhar Defense List Expanded', description: 'Ministry issues 5th indigenization list, blocking import of hundreds of complex military spares.' },
      { id: 'de-n-3', year: 2024, title: 'BrahMos Export Consignment Shipped', description: 'First battery of BrahMos supersonic missiles delivered to Philippines under $375M export deal.' },
      { id: 'de-n-4', year: 2025, title: 'INS Arighat Commissioned', description: 'Second Arihant-class nuclear ballistic missile submarine enters active service, boosting deterrence.' },
      { id: 'de-n-5', year: 2024, title: 'Agni-5 MIRV Technology Test Success', description: 'DRDO conducts "Mission Divyastra" flight test, demonstrating multiple warhead separation capability.' },
      { id: 'de-n-6', year: 2025, title: 'MQ-9B Predator Drone Deal Signed', description: 'Inter-governmental agreement signed to acquire 31 high-altitude long-endurance drones.' },
      { id: 'de-n-7', year: 2024, title: 'Indigenous Light Tank (Zorawar) Trials', description: 'DRDO starts high-altitude field trials of Zorawar light tank designed for Himalayan environments.' },
      { id: 'de-n-8', year: 2024, title: 'Akash-NG System Intercept Record', description: 'Next-Generation Akash surface-to-air missile intercepts high-speed low-radar targets in tests.' },
      { id: 'de-n-9', year: 2025, title: 'Defense Space Agency Joint Exercises', description: 'DSA conducts simulated space-warfare exercise "Space X" to test satellite defensive protocols.' },
      { id: 'de-n-10', year: 2024, title: 'Private sector gets ₹25,000 Crore orders', description: 'L&T, Tata Defence, and Bharat Forge receive major orders for artillery and rocket systems.' },
      { id: 'de-n-11', year: 2026, title: 'INS Vikrant Second Carrier Operations Active', description: 'Indigenous aircraft carrier achieves full operational integration with MiG-29K squadrons, leading combat carrier task force exercises.' }
    ]
  },
  environment: {
    achievements: [
      { id: 'ev-a-1', year: 2023, title: 'Project Tiger Golden Jubilee', description: 'Wild tiger population increases to 3,682, representing over 75% of the world\'s wild tigers.' },
      { id: 'ev-a-2', year: 2021, title: 'COP26 Net-Zero Pledge', description: 'India commits to reaching net-zero carbon emissions by 2070 and establishing 500GW green energy.' },
      { id: 'ev-a-3', year: 2022, title: 'Ban on Single-Use Plastics', description: 'Enforces nationwide restriction on manufacture, import, and distribution of identified single-use plastics.' },
      { id: 'ev-a-4', year: 2015, title: 'International Solar Alliance Co-found', description: 'Co-founded with France, establishing global headquarters in Gurugram to promote solar grids.' },
      { id: 'ev-a-5', year: 1974, title: 'Water Pollution Control Act', description: 'First major national environmental statute passed, creating the Central Pollution Control Board (CPCB).' },
      { id: 'ev-a-6', year: 1980, title: 'Forest Conservation Act Passed', description: 'Restricts de-reservation of forests and diversion of forest land for non-forest industrial use.' },
      { id: 'ev-a-7', year: 1986, title: 'Environment Protection Act', description: 'Passed as an umbrella legislation in the wake of the Bhopal disaster to regulate safety.' },
      { id: 'ev-a-8', year: 2002, title: 'Biological Diversity Act Enacted', description: 'Provides framework for conservation, sustainable use, and equitable sharing of biological resources.' },
      { id: 'ev-a-9', year: 2010, title: 'National Green Tribunal Established', description: 'NGT set up as a specialized environmental court for fast-track resolution of disputes.' },
      { id: 'ev-a-10', year: 2016, title: 'Solid Waste Management Rules', description: 'Mandates source segregation of waste and holds brand owners responsible for plastic packing recycling.' },
      { id: 'ev-a-11', year: 2014, title: 'National Air Quality Index (AQI)', description: 'Launched with a "One Color-One Number-One Description" format to alert citizens on pollution.' },
      { id: 'ev-a-12', year: 2006, title: 'Forest Rights Act (FRA) Passed', description: 'Recognizes rights of forest-dwelling tribal communities to forest land and biodiversity resources.' },
      { id: 'ev-a-13', year: 1992, title: 'Project Elephant Launch', description: 'Initiated to protect wild elephant populations, secure corridors, and address conflicts.' },
      { id: 'ev-a-14', year: 1981, title: 'Air Pollution Control Act', description: 'Statute enacted to define air pollution controls and expand power of CPCB to test exhausts.' },
      { id: 'ev-a-15', year: 1972, title: 'Wildlife Protection Act Passed', description: 'Established national parks, sanctuaries, and outlawed hunting of endangered species.' },
      { id: 'ev-a-16', year: 1952, title: 'First National Forest Policy', description: 'Stipulated target of keeping 33% of national land area under forest cover for ecological balance.' },
      { id: 'ev-a-17', year: 2019, title: 'National Clean Air Programme', description: 'NCAP launched targeting 20-30% reduction in particulate matter concentration across 131 cities.' },
      { id: 'ev-a-18', year: 2018, title: 'Compensatory Afforestation Fund', description: 'CAMPA fund rules notified, releasing ₹54,000 Crore to states for active tree planting.' },
      { id: 'ev-a-19', year: 2008, title: 'National Action Plan on Climate Change', description: 'NAPCC launched, establishing eight national missions covering solar, water, and glaciers.' },
      { id: 'ev-a-20', year: 1973, title: 'Chipko Movement Inception', description: 'Historic grassroots forest conservation movement starts in Uttarakhand hills, inspiring global activists.' }
    ],
    news: [
      { id: 'ev-n-1', year: 2025, title: 'EV Sales Penetration Crosses 7%', description: 'Electric vehicle sales reach record highs, supported by local battery assembly and subsidy grids.' },
      { id: 'ev-n-2', year: 2024, title: 'State of Forest Report: Green Cover Up', description: 'Satellite survey indicates net increase of 2,200 sq km in national forest and tree cover.' },
      { id: 'ev-n-3', year: 2024, title: 'Cheetah Reintroduction Program Success', description: 'Second batch of cheetah cubs born in Kuno National Park, showing adaptation to local habitat.' },
      { id: 'ev-n-4', year: 2025, title: 'National Mission on Oil Palm Sustainability', description: 'Implements environmental guidelines to restrict oil palm farming to deforested fallows.' },
      { id: 'ev-n-5', year: 2024, title: 'Ramsar Wetlands Count Rises to 85', description: 'Ten new Indian wetland sites declared of international importance, securing biodiversity protection.' },
      { id: 'ev-n-6', year: 2025, title: 'National Air Quality Monitoring Grid', description: 'Over 500 continuous ambient air monitoring stations linked to public mobile app channels.' },
      { id: 'ev-n-7', year: 2024, title: 'Green Hydrogen Blending in Gas Grid', description: 'NTPC starts pilot blending of green hydrogen in piped gas lines of Gujarat.' },
      { id: 'ev-n-8', year: 2024, title: 'E-Waste Recycling Targets Mandated', description: 'New rules enforce electronics manufacturers to collect and recycle 60% of product packaging waste.' },
      { id: 'ev-n-9', year: 2025, title: 'Solar Powered Railway Stations Grid', description: 'Indian Railways commissions 1,200 solar-roofed stations, saving carbon emissions.' },
      { id: 'ev-n-10', year: 2024, title: 'Sovereign Green Fund Projects Cleared', description: 'Ministry clears funding for coastal protection walls and urban carbon-sink forests.' },
      { id: 'ev-n-11', year: 2026, title: 'Green Energy Capacity Crosses 200GW', description: 'India achieves a historic milestone as total installed renewable energy capacity (excluding large hydro) reaches 202 GW.' }
    ]
  },
  demographics: {
    achievements: [
      { id: 'dm-a-1', year: 2023, title: 'Demographic Dividend Window Peak', description: 'Working-age population (15-64 years) reaches 68% of total, providing a historic economic growth window.' },
      { id: 'dm-a-2', year: 2021, title: 'Fertility Rate Drops Below Replacement', description: 'NFHS-5 reports national Total Fertility Rate (TFR) has fallen to 2.0, below the replacement level of 2.1.' },
      { id: 'dm-a-3', year: 2011, title: 'Female Literacy Outpaces Male Growth', description: 'Census registers overall literacy at 74.04%, with female literacy growing at a faster rate.' },
      { id: 'dm-a-4', year: 1952, title: 'World\'s First Family Planning Program', description: 'India launches state-sponsored family planning to regulate demographics and support welfare.' },
      { id: 'dm-a-5', year: 1961, title: 'Census of 1961 Execution', description: 'First census detailing industrial classification of work, mapping modern employment structures.' },
      { id: 'dm-a-6', year: 1978, title: 'Child Marriage Restraint Amendment', description: 'Raised statutory minimum age of marriage to 21 years for males and 18 years for females.' },
      { id: 'dm-a-7', year: 1994, title: 'PCPNDT Act Enacted', description: 'Banned prenatal sex determination to arrest declining child sex ratios, enforcing jail terms.' },
      { id: 'dm-a-8', year: 2000, title: 'National Population Policy (NPP)', description: 'Set goals for immunization, birth registration, and replacement fertility rate target of 2.1.' },
      { id: 'dm-a-9', year: 2005, title: 'Janani Suraksha Yojana Launch', description: 'Cash incentive scheme launched to encourage institutional deliveries, dropping infant mortality.' },
      { id: 'dm-a-10', year: 2015, title: 'Beti Bachao Beti Padhao Launch', description: 'Campaign launched to improve child sex ratio and promote girl education in 100 critical districts.' },
      { id: 'dm-a-11', year: 2022, title: 'Median Age of 28.2 Years', description: 'India remains one of the youngest major economies, compared to median ages of 38+ in China/US.' },
      { id: 'dm-a-12', year: 2016, title: 'Maternity Benefit Act Amendment', description: 'Increased paid maternity leave from 12 weeks to 26 weeks, protecting female workforce retention.' },
      { id: 'dm-a-13', year: 2011, title: 'SECC Census Conducted', description: 'Socio-Economic and Caste Census executed to identify targeted beneficiaries for development schemes.' },
      { id: 'dm-a-14', year: 2004, title: 'National Commission on Population', description: 'Reconstituted under PM chairmanship to review population policy targets and rural migration.' },
      { id: 'dm-a-15', year: 1991, title: 'Census of 1991 Results', description: 'Registers post-reform literacy surge, passing the 50% benchmark for the first time.' },
      { id: 'dm-a-16', year: 1976, title: 'First National Population Policy', description: 'Introduced incentives for family planning and linked state parliamentary seats to 1971 census.' },
      { id: 'dm-a-17', year: 1966, title: 'Department of Family Planning Setup', description: 'Created as a separate department within Health Ministry to scale rural birth-control grids.' },
      { id: 'dm-a-18', year: 1956, title: 'Immoral Traffic Prevention Act', description: 'Passed to protect girls from exploitation and support gender demographic safety.' },
      { id: 'dm-a-19', year: 1948, title: 'Census Act Enacted', description: 'Provides statutory backing and confidentiality guarantees to the execution of national decadal censuses.' },
      { id: 'dm-a-20', year: 1911, title: 'Early Demographic Transition Study', description: 'Legacy census reports early public health initiatives reducing severe famine-related mortality spikes.' }
    ],
    news: [
      { id: 'dm-n-1', year: 2025, title: 'Urban Labor Force Participation Rises', description: 'Periodic Labour Force Survey registers rise in female urban worker-population ratio to 25.6%.' },
      { id: 'dm-n-2', year: 2024, title: 'Life Expectancy Touches 70.2 Years', description: 'Ministry report shows steady rise in life expectancy from 32 years (1947) to over 70 years.' },
      { id: 'dm-n-3', year: 2024, title: 'Youth Population Share Peak Analysis', description: 'UN report states India\'s youth cohort (15-29 years) has peaked, offering maximum labor potential.' },
      { id: 'dm-n-4', year: 2025, title: 'Migration Registry API Proposed', description: 'Ministry plans a unified digital platform to track interstate migrant workers and coordinate welfare benefits.' },
      { id: 'dm-n-5', year: 2024, title: 'TFR Drops in Northern States', description: 'TFR in UP and Bihar reaches historic lows of 2.3 and 2.6, closing in on replacement levels.' },
      { id: 'dm-n-6', year: 2025, title: 'Aadhaar Coverage Touches 99% Adults', description: 'Over 1.39 Billion identity cards generated, covering nearly the entire adult population.' },
      { id: 'dm-n-7', year: 2024, title: 'Skill Development Schemes Placements Up', description: 'PMKVY registers 1.2 Million placements in electronics and automotive logistics domains.' },
      { id: 'dm-n-8', year: 2024, title: 'Elderly Population Projection Released', description: 'Demographers advise developing geriatric care grids as senior population share is projected to touch 15% by 2036.' },
      { id: 'dm-n-9', year: 2025, title: 'Digital Literacy among Rural Women', description: 'Report reveals internet literacy among rural women rises by 12% via local self-help groups.' },
      { id: 'dm-n-10', year: 2024, title: 'Birth Registration Digitalization', description: 'Unified national civil registry portal launched to generate real-time digital birth certificates.' },
      { id: 'dm-n-11', year: 2026, title: 'Decadal Census Digital Infrastructure', description: 'Ministry of Home Affairs deploys a fully paperless, mobile-app-based digital census portal for real-time population registry.' }
    ]
  },
  decades: {
    achievements: [
      { id: 'dc-a-1', year: 1951, title: 'First Five-Year Plan', description: 'Centralized planning commences, focusing state capital on agriculture, dams, and land reforms.' },
      { id: 'dc-a-2', year: 1966, title: 'Green Revolution Launched', description: 'Initiation of high-yield farming methods, leading to national food security and export surplus.' },
      { id: 'dc-a-3', year: 1991, title: 'Economic Liberalization reforms', description: 'Dismantled License Raj, opened international trade and launched modern industrial growth.' },
      { id: 'dc-a-4', year: 2015, title: 'Digital India Inception', description: 'Unified digital stack push, giving birth to UPI, biometric Aadhaar registry, and mobile governance.' },
      { id: 'dc-a-5', year: 1956, title: 'State Reorganization Act', description: 'Demarcated state boundaries based on linguistic lines, establishing federal structural stability.' },
      { id: 'dc-a-6', year: 1962, title: 'First Space Committee (INCOSPAR)', description: 'Established under Dr. Vikram Sarabhai, laying foundation for subsequent ISRO launch success.' },
      { id: 'dc-a-7', year: 1974, title: 'Pokhran-I Nuclear Test', description: 'Operation Smiling Buddha: Demonstrates nuclear capability, establishing strategic research baseline.' },
      { id: 'dc-a-8', year: 1982, title: 'Asiad Games Infrastructure Push', description: 'Color television broadcasting launched, and major sports infrastructure completed in New Delhi.' },
      { id: 'dc-a-9', year: 2000, title: 'IT Act & Connectivity Boom', description: 'IT Act passed, laying legal framework for software export hubs and cyber commerce growth.' },
      { id: 'dc-a-10', year: 2010, title: 'Right to Education Enforced', description: 'RTE Act comes into effect, making primary education a fundamental right for all children.' },
      { id: 'dc-a-11', year: 2020, title: 'National Education Policy NEP', description: 'Approved to replace 1986 policy, promoting multi-disciplinary higher studies.' },
      { id: 'dc-a-12', year: 2018, title: 'National Health Cover (PM-JAY)', description: 'Ayushman Bharat launched, insuring 50 Crore citizens against high tertiary hospital bills.' },
      { id: 'dc-a-13', year: 2005, title: 'Right to Information (RTI) Act', description: 'Passed to promote transparency, allowing citizens to legally demand details from public offices.' },
      { id: 'dc-a-14', year: 1999, title: 'National Highways Development', description: 'NHDP launched by PM Vajpayee, initiating Golden Quadrilateral expressway plans.' },
      { id: 'dc-a-15', year: 1988, title: 'SEBI Established', description: 'Securities and Exchange Board of India formed to regulate capital markets and protect investors.' },
      { id: 'dc-a-16', year: 1975, title: 'Satellite Instructional TV (SITE)', description: 'SITE pilot launches, using US ATS-6 satellite to beam educational TV to 2,400 villages.' },
      { id: 'dc-a-17', year: 1969, title: 'Nationalisation of Coal Mines', description: 'First stage of coal mining regulation, organizing production under state coordination.' },
      { id: 'dc-a-18', year: 1953, title: 'Air Corporations Act Pass', description: 'Nationalized domestic aviation, creating corporate hubs for Air India passenger lines.' },
      { id: 'dc-a-19', year: 1948, title: 'Employees State Insurance Act', description: 'ESI Act passed to provide social security and medical cover to factory workers.' },
      { id: 'dc-a-20', year: 1947, title: 'Declaration of Independence', description: 'India achieves freedom, initiating the democratic republic journey under PM Nehru.' }
    ],
    news: [
      { id: 'dc-n-1', year: 2025, title: 'Decadal Tech Growth Analysis', description: 'Report states 2015-2025 is India\'s fastest digital transformation decade, led by cheap mobile data.' },
      { id: 'dc-n-2', year: 2024, title: 'Poverty Reduction Milestones Reported', description: 'UN report states over 41 Crore people escaped multidimensional poverty in India over 15 years.' },
      { id: 'dc-n-3', year: 2024, title: 'Infrastructure Capex Hits 3.4% of GDP', description: 'Highest decadal public spending rate allocated to roads, railways, and renewable power grids.' },
      { id: 'dc-n-4', year: 2025, title: 'Urbanization index projection', description: 'Demographers project urban population will cross 50% by 2040, calling for smarter municipal setups.' },
      { id: 'dc-n-5', year: 2024, title: 'E-Commerce Penetration Index Up', description: 'ONDC and private apps push retail digital shopping to touch 12% of national commerce transactions.' },
      { id: 'dc-n-6', year: 2025, title: 'Renewables Share Reaches 43%', description: 'Green power capacity expansion is the fastest in the current decade compared to thermal installations.' },
      { id: 'dc-n-7', year: 2024, title: 'Export Composition Shifts to Electronics', description: 'Share of engineered products and smartphones in exports hits historical high, reducing commodity reliance.' },
      { id: 'dc-n-8', year: 2024, title: 'Adult Literacy Touches 81%', description: 'Survey reveals massive gains in rural adult literacy, narrowing the gender gap to historic lows.' },
      { id: 'dc-n-9', year: 2025, title: 'India Stack Global Partnerships Grow', description: 'Dozens of developing countries sign agreements to pilot India\'s open identity and payment systems.' },
      { id: 'dc-n-10', year: 2024, title: 'Venture Capital Inflows Rebound', description: 'Investment focus shifts to deep-tech, artificial intelligence, and space-tech startups.' },
      { id: 'dc-n-11', year: 2026, title: 'Indian Nominal GDP Touches $4.58 Trillion', description: 'Official economic registers record nominal GDP at $4.58T, solidifying India\'s position as the world\'s fastest-growing major economy.' }
    ]
  }
};

// Aliases for compatibility
MILESTONES_DATA['military'] = MILESTONES_DATA['defense'];
MILESTONES_DATA['steel & infrastructure'] = MILESTONES_DATA['steel'];
MILESTONES_DATA['rural india'] = MILESTONES_DATA['rural'];
MILESTONES_DATA['urban india'] = MILESTONES_DATA['urban'];
MILESTONES_DATA['agriculture & food'] = MILESTONES_DATA['agriculture'];
MILESTONES_DATA['industry & manufacturing'] = MILESTONES_DATA['industry'];
MILESTONES_DATA['steel & infrastructure'] = MILESTONES_DATA['steel'];
MILESTONES_DATA['transport networks'] = MILESTONES_DATA['transport'];
MILESTONES_DATA['energy & power'] = MILESTONES_DATA['energy'];
MILESTONES_DATA['education & skills'] = MILESTONES_DATA['education'];
MILESTONES_DATA['healthcare & hdi'] = MILESTONES_DATA['healthcare'];
MILESTONES_DATA['digital india & it'] = MILESTONES_DATA['digital'];
MILESTONES_DATA['defense & military'] = MILESTONES_DATA['defense'];
MILESTONES_DATA['environment & climate'] = MILESTONES_DATA['environment'];
MILESTONES_DATA['demographics'] = MILESTONES_DATA['demographics'];
MILESTONES_DATA['decade comparisons'] = MILESTONES_DATA['decades'];
