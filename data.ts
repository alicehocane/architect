import { Architect, CityInfo, BranchLocation } from './types';

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const rawData = [
    {
        "Shop Name": "1X1 Design Studios",
        "Category": "Architectural designer",
        "Website": "http://www.instagram.com/1x1designstudios",
        "Locations": [
            {
                "City": "Attock",
                "Address": "1X1 Design Studios, Kamra Rd, Attock, 43600",
                "Phone Number": "0307 5493070",
                "Rating": 5.0,
                "Map URL": "https://www.google.com/maps/dir//1x1+Design+Studios,+Kamra+Rd,+Attock,+43600/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38df1992e8ab83d5:0xabfecb1613640728?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3 Roots Studio",
        "Category": "Architectural designer",
        "Website": "https://www.facebook.com/profile.php?id=100064031169210",
        "Locations": [
            {
                "City": "Jamshoro",
                "Address": "98GQ FFQ 3 Roots Studio, Latifabad Unit 3 Latifabad, Hyderabad",
                "Phone Number": "0317 3927784",
                "Rating": 5.0,
                "Reviews": 2.0,
                "Map URL": "https://www.google.com/maps/dir//98GQ%2BFFQ+3+Roots+Studio,+Latifabad+Unit+3+Latifabad,+Hyderabad/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x394c714575e58599:0x56db3e8f41099c5d?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3D Architectural/Product Designing Services",
        "Category": "3D printing service",
        "Website": "https://www.behance.net/3dbeast",
        "Locations": [
            {
                "City": "Thatta",
                "Phone Number": "0326 5777755",
                "Rating": 5.0,
                "Reviews": 2.0
            }
        ]
    },
    {
        "Shop Name": "3D Architecture Visualization",
        "Category": "Architectural designer",
        "Website": "https://www.behance.net/junaidmalana1",
        "Locations": [
            {
                "City": "Kotri",
                "Phone Number": "0321 3085892"
            }
        ]
    },
    {
        "Shop Name": "Interior & Designing Services",
        "Category": "Architect",
        "Website": "https://www.instagram.com/design_arch94/",
        "Locations": [
            {
                "City": "DHA Rawalpindi",
                "Address": "3D Designer,Interior&Exterior DESIGNING SERVICES, DHA Phase 1,bharia town, gulberg, blue area, Rawalpindi, 46000",
                "Phone Number": "0305 5151780",
                "Rating": 5.0,
                "Reviews": 10.0,
                "Map URL": "https://www.google.com/maps/dir//3D+Designer,Interior%26Exterior+DESIGNING+SERVICES,+DHA+Phase+1,bharia+town,+gulberg,+blue+area,+Rawalpindi,+46000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38dff1f84fce2e5b:0x3e024c92296d65fa?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3D Elevations House",
        "Category": "Architect",
        "Website": "https://3delevationshouse.com/",
        "Locations": [
            {
                "City": "Gulshan-e-Iqbal",
                "Address": "Office No 15, 2nd Floor, 3D Elevations House, HJ Centre, Block 13 B Main University Rd, Gulshan-e-Iqbal, Karachi, 75300",
                "Phone Number": "0300 9232085",
                "Rating": 4.3,
                "Reviews": 26.0,
                "Map URL": "https://www.google.com/maps/dir//Office+No+15,+2nd+Floor,+3D+Elevations+House,+HJ+Centre,+Block+13+B+Main+University+Rd,+Gulshan-e-Iqbal,+Karachi,+75300/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3eb33f508d9b01f1:0x56a69b59b8760ab9?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3D Home Designers ( Architect & Builders)",
        "Category": "Architectural designer",
        "Locations": [
            {
                "City": "Bahawalpur",
                "Address": "3D Home Designers ( Architect & Builders), Sadar Puli, Bahawalpur, 63100",
                "Phone Number": "0301 4300363",
                "Rating": 5.0,
                "Reviews": 16.0,
                "Map URL": "https://www.google.com/maps/dir//3D+Home+Designers+(+Architect+%26+Builders),+Sadar+Puli,+Bahawalpur,+63100/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x393b9123304cf1c3:0x7e542cbc0dac0ab5?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3Dfaster",
        "Category": "Architectural designer",
        "Locations": [
            {
                "City": "Satellite Town",
                "Address": "J3W9 QCG 3DFaster, Gulzar Chowk, 8th Rd, Satellite Town, Rawalpindi, 46300",
                "Phone Number": "0303 5086573",
                "Rating": 5.0,
                "Reviews": 2.0,
                "Map URL": "https://www.google.com/maps/dir//J3W9%2BQCG+3DFaster,+Gulzar+Chowk,+8th+Rd,+Satellite+Town,+Rawalpindi,+46300/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38df95a5f694e98d:0xb0ccc1d722f873aa?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3Dfrontelevation.Co",
        "Category": "Architecture firm",
        "Website": "https://www.artstation.com/frontelevation3d",
        "Locations": [
            {
                "City": "Lahore",
                "Address": "3Dfrontelevation.Co, Cca, 77, Sector C Phase 5 D.H.A, Lahore, 54000",
                "Phone Number": "0313 7748494",
                "Rating": 4.7,
                "Map URL": "https://www.google.com/maps/dir//3dFrontElevation.co,+CCA,+77,+Sector+C+Phase+5+D.H.A,+Lahore,+54000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3918ff8e3c836879:0x80cd7120f919fff9?sa=X&ved=1t:57443&ictx=111"
            },
            {
                "City": "Bahria Town Lahore",
                "Address": "969M H26 3dfrontelevation-co Architect interior's Islamabad, Raiwind Rd, Lahore",
                "Phone Number": "0300 1378494",
                "Rating": 5.0,
                "Reviews": 20.0,
                "Map URL": "https://www.google.com/maps/dir//969M%2BH26+3dfrontelevation-co+Architect+interior's+Islamabad,+Raiwind+Rd,+Lahore/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3919abc2aba7145f:0x77437256ed0156c6?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3Drender-Vision",
        "Category": "Construction company",
        "Locations": [
            {
                "City": "Bannu",
                "Address": "XJP7 J5W 3Drender-Vision, Bannu",
                "Phone Number": "0331 9595060",
                "Rating": 3.0,
                "Reviews": 1.0,
                "Map URL": "https://www.google.com/maps/dir//XJP7%2BJ5W+3Drender-Vision,+Bannu/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3927f5692918955f:0x628292e0bfd0daf1?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3Dx Design Studio (Architect)",
        "Category": "Architectural designer",
        "Locations": [
            {
                "City": "Sahiwal",
                "Address": "3Dx Design Studio (Architect), Ideal Bakery, Ansar Gali, Sahiwal, 57000",
                "Phone Number": "0305 1718342",
                "Rating": 5.0,
                "Reviews": 1.0,
                "Map URL": "https://www.google.com/maps/dir//3DX+Design+Studio+(Architect),+Ideal+Bakery,+Ansar+Gali,+Sahiwal,+57000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3922b7f791a4d819:0x64b991aa7db5a7c5?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3G Arch & Graphics",
        "Category": "Architect",
        "Website": "https://sites.google.com/view/3garchgraphics/home",
        "Locations": [
            {
                "City": "Rawalpindi",
                "Address": "Office No. 06, 3G Arch & Graphics, Idrees Plaza, Range Rd, Rawalpindi, 46000",
                "Phone Number": "0346 5411751",
                "Rating": 4.9,
                "Map URL": "https://www.google.com/maps/dir//Office+No.+06,+3G+Arch+%26+Graphics,+Idrees+Plaza,+Range+Rd,+Rawalpindi,+46000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38df9410c218e953:0xd6e96bc43f2f1a9c?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "3P Design House",
        "Category": "Architecture firm",
        "Website": "https://wa.me/message/GBOQ4TLSAAOBI1",
        "Locations": [
            {
                "City": "Sialkot",
                "Address": "3P Design House, Hajipura, Sialkot, 51310",
                "Phone Number": "0300 1018920",
                "Rating": 5.0,
                "Map URL": "https://www.google.com/maps/dir//3P+Design+House,+Hajipura,+Sialkot,+51310/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x391eebd02841b52b:0x2761da5c1225141?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "4Th Dimension Architecture & Designers",
        "Category": "Architect",
        "Locations": [
            {
                "City": "Rahim Yar Khan",
                "Address": "C8H3 998 4Th Dimension Architecture & Designers, Rahim Yar Khan, 64200",
                "Phone Number": "0301 3941431",
                "Rating": 3.0,
                "Reviews": 4.0,
                "Map URL": "https://www.google.com/maps/dir//C8H3%2B998+4th+Dimension+architecture+%26+Designers,+Rahim+Yar+Khan,+64200/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x39375b9127d86709:0x434a2a1b41aab829?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "5Ab Grand Linez By Ch Shoaib Khan Shariq Architect",
        "Category": "Construction company",
        "Website": "https://www.facebook.com/profile.php?id=100086773577053&mibextid=ZbWKwL",
        "Locations": [
            {
                "City": "Gujrat",
                "Address": "H3Mg Jxh 5Ab Grand Linez By Ch Shoaib Khan Shariq Architect, City Plaza, Jail Chowk, Rehman Shaheed Rd, Gharibpura, Gujrat, 50700",
                "Phone Number": "0333 8418518",
                "Rating": 4.8,
                "Map URL": "https://www.google.com/maps/dir//H3MG%2BJXH+5AB+Grand+Linez+by+Ch+Shoaib+Khan+Shariq+Architect,+City+Plaza,+Jail+Chowk,+Rehman+Shaheed+Rd,+Gharibpura,+Gujrat,+50700/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x391f1b29d3ef1961:0x63d9d3d10ef45067?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A & R Architect & Builder",
        "Category": "Architectural designer",
        "Locations": [
            {
                "City": "Attock",
                "Address": "Q9Q6 626 A & R Architect & Builder, Darul Islam Colony Attock",
                "Phone Number": "0341 1513164",
                "Rating": 5.0,
                "Reviews": 3.0,
                "Map URL": "https://www.google.com/maps/dir//Q9Q6%2B626+A+%26+R+Architect+%26+Builder,+Darul+Islam+Colony+Attock/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38df19b0230d5835:0x9f3a1a939f012a43?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A Design Corner",
        "Category": "Architecture firm",
        "Locations": [
            {
                "City": "Barkhan",
                "Address": "A DESIGN CORNER, OFFICE # B-24, China Town Plaza, Liaquat Bagh, Rawalpindi, 46000",
                "Rating": 3.8,
                "Reviews": 6.0,
                "Map URL": "https://www.google.com/maps/dir//A+DESIGN+CORNER,+OFFICE+%23+B-24,+China+Town+Plaza,+Liaquat+Bagh,+Rawalpindi,+46000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38df958032096fc3:0xcf8e7da5032bc268?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A J Architects",
        "Category": "Architect",
        "Website": "http://www.ajarchitects.co.in/",
        "Locations": [
            {
                "City": "Gujrat",
                "Address": "A J Architects, Shubh Universal, 207 - 208, Vesu Main Road, Opp. Vijya Laxmi Hall, Vesu, Surat, Gujarat 395007, India",
                "Rating": 4.8,
                "Map URL": "https://www.google.com/maps/dir//A+J+Architects,+SHUBH+UNIVERSAL,+207+-+208,+Vesu+Main+Road,+opp.+VIJYA+LAXMI+HALL,+Vesu,+Surat,+Gujarat+395007,+India/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be04d89dcf3bdc5:0x8cdfa829b6d14005?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A Qayyum Associates",
        "Category": "Architecture firm",
        "Locations": [
            {
                "City": "Lahore",
                "Address": "A Qayyum Associates, 1-Ashrafia Park, Lahore – Kasur Rd, Opp. Wapda Hospital, Lahore, 54000",
                "Phone Number": "0332 8481199",
                "Rating": 4.6,
                "Reviews": 15.0,
                "Map URL": "https://www.google.com/maps/dir//A+Qayyum+Associates,+1-ASHRAFIA+PARK,+Lahore+%E2%80%93+Kasur+Rd,+opp.+Wapda+Hospital,+Lahore,+54000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x39190546fe9c691d:0xfa27f083153946e0?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A&M Architectural Design Studio",
        "Category": "Architecture firm",
        "Website": "https://www.behance.net/aizazkhan10",
        "Locations": [
            {
                "City": "Swat",
                "Address": "A&M ARCHITECTURAL DESIGN STUDIO, BLUE AREA FAIZAABAD ROAD SAIDU SHAREEF, Mingora, 19130",
                "Phone Number": "0333 3068889",
                "Rating": 5.0,
                "Reviews": 8.0,
                "Map URL": "https://www.google.com/maps/dir//A%26M+ARCHITECTURAL+DESIGN+STUDIO,+BLUE+AREA+FAIZAABAD+ROAD+SAIDU+SHAREEF,+Mingora,+19130/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38dc2354aa4ab19b:0x275961e5ed2d072c?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A&S Architects & Building Designer",
        "Category": "Architectural designer",
        "Locations": [
            {
                "City": "Haripur",
                "Address": "Office #32 first floor, A&S ARCHITECTS & Building designer, Shoukat plaza, Main G.T road, opp. Paris hotels, Harīpur",
                "Phone Number": "0316 5925623",
                "Rating": 1.0,
                "Reviews": 1.0,
                "Map URL": "https://www.google.com/maps/dir//Office+%2332+first+floor,+A%26S+ARCHITECTS+%26+Building+designer,+Shoukat+plaza,+Main+G.T+road,+opp.+Paris+hotels,+Har%C4%ABpur/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x38dfb33003d60d8f:0x416d6ccdb69ccfd5?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A&S Architects And Consultants",
        "Category": "Architecture firm",
        "Website": "https://theasarchitects.com/",
        "Locations": [
            {
                "City": "Multan",
                "Address": "A&S Architects And Consultants, Multan",
                "Phone Number": "0300 6306541",
                "Rating": 4.3,
                "Map URL": "https://www.google.com/maps/dir//A%26S+Architects+and+Consultants,+Multan/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x393b353118329331:0x15f5342b5631092a?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A+ Architecture",
        "Category": "Architect",
        "Locations": [
            {
                "City": "Gujranwala",
                "Address": "A  Architecture, 43 Jinnah Super Market, Gujranwala, 52250",
                "Phone Number": "0300 9643247",
                "Rating": 4.7,
                "Reviews": 15.0,
                "Map URL": "https://www.google.com/maps/dir//A%2B+Architecture,+43+jinnah+super+market,+Gujranwala,+52250/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x391f2ba538339a13:0x6c3e8ea6f1e7f8b9?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A-Line Architects",
        "Category": "Architecture firm",
        "Website": "http://instagram.com/aline_architects",
        "Locations": [
            {
                "City": "Lahore",
                "Address": "A-Line Architects, E-155,A/5 Ghazni Lane, D.H.A. Main Blvd, New Super Town, 54000",
                "Phone Number": "0340 9783553",
                "Rating": 5.0,
                "Map URL": "https://www.google.com/maps/dir//A-line+Architects,+E-155,A%2F5+Ghazni+lane,+D.H.A.+Main+Blvd,+New+Super+Town,+54000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x391905d31c867f6b:0x1d570f4e4c8abdf5?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    },
    {
        "Shop Name": "A-R Architect And Valuers",
        "Category": "Construction company",
        "Locations": [
            {
                "City": "Larkana",
                "Address": "H55W QXM A-R architect and valuers, Sachal Colony, Larkana",
                "Map URL": "https://www.google.com/maps/dir//H55W%2BQXM+A-R+architect+and+valuers,+Sachal+Colony,+Larkana/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3935abbb6de2bb1b:0x2b940280be4c9bfa?sa=X&ved=1t:57443&ictx=111"
            }
        ]
    }
];



export const ALL_ARCHITECTS: Architect[] = rawData.map(item => {
  const locations = (item.Locations as any[]).map(loc => ({
    ...loc,
    citySlug: slugify(loc.City)
  })) as BranchLocation[];
  
  const ratings = locations.filter(l => l.Rating).map(l => l.Rating as number);
  const globalRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
  const totalReviews = locations.reduce((acc, loc) => acc + (loc.Reviews || 0), 0);

  return {
    ...item,
    Locations: locations,
    slug: slugify(item['Shop Name']),
    globalRating,
    totalReviews
  } as Architect;
});

export const ARCHITECT_MAP = new Map(ALL_ARCHITECTS.map(a => [a.slug, a]));

export const CITIES: CityInfo[] = Array.from(
  new Set(ALL_ARCHITECTS.flatMap(a => a.Locations.map(loc => loc.City)))
).map(cityName => {
  const slug = slugify(cityName);
  const count = ALL_ARCHITECTS.filter(a => a.Locations.some(loc => loc.citySlug === slug)).length;
  return {
    name: cityName,
    slug: slug,
    count: count,
    image: `https://picsum.photos/seed/${slug}/800/600`
  };
}).sort((a, b) => b.count - a.count);

export const CITY_MAP = new Map(CITIES.map(c => [c.slug, c]));


// NEW: Category Logic
export const CATEGORIES = Array.from(
  new Set(ALL_ARCHITECTS.map(a => a.Category).filter(Boolean))
).map(catName => {
  const name = catName as string;
  const slug = slugify(name);
  const count = ALL_ARCHITECTS.filter(a => a.Category === name).length;
  return { name, slug, count };
}).sort((a, b) => b.count - a.count);

export const CATEGORY_MAP = new Map(CATEGORIES.map(c => [c.slug, c]));

export const getArchitectsByCategory = (categorySlug: string): Architect[] => {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return [];
  return ALL_ARCHITECTS.filter(a => a.Category === cat.name);
};


export const getArchitectBySlug = (slug: string) => ARCHITECT_MAP.get(slug);

export const getArchitectsByCity = (citySlug: string): Architect[] => {
  return ALL_ARCHITECTS.filter(a => a.Locations.some(loc => loc.citySlug === citySlug));
};