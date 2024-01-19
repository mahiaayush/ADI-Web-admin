import { Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/home/Home";
import EntityDetails from "../components/entities/details/EntityDetails";
import EntityList from "../components/entities/list/List";
import UserDetail from "../components/users/internal/details/InternalUserDetails";
import ExternalUserDetail from "../components/users/external/details/ExternalUserDetails";
import UserIndex from "../components/users/UserIndex";
import InternalEditUser from "../components/users/editUser/InternalEditUser";
import ExternalEditUser from "../components/users/editUser/ExternalEditUser";
import DetailScreen from "src/components/CounselloApplication/DetailScreen";
import CounsellorApplicationList from "src/components/CounselloApplication/CounsellorApplicationList";
import Counsellor from "src/components/Counsellors/Counsellors";
import CounsellorDetails from "src/components/Counsellors/CounsellorDetails";
import SeoTagList from "src/components/Seo/SeoTagList";
import DashboardStatusData from "../components/dashboard/DashboardStatusData";
import Occupancy from "../components/counselor-occupancy/occupancy";
import InterviewerList from "src/components/Interviewers/InterviewerList";
import ItemsList from "src/components/ItemMaster/ItemList";
import SessionSlotsOverride from "src/components/Override/SessionSlotsOverride";
import Availability from "src/components/Availability/Availability";
import Sessions from "src/components/SessionsList/Sessions";
import SessionsDetail from "src/components/SessionsList/SessionsDetail";
import PremiumUser from "src/components/users/PremiumUser";
import Orders from "src/components/LearningHub/Orders";
import OrderDetail from "src/components/LearningHub/OrderDetail";
import ErrorNotFound from '../components/RouteMaster/ErrorNotFound';
import CreateRole from "../components/RouteMaster/CreateRole";
import RoleListActions from "src/components/RouteMaster/RoleListActions";
import Logistics from "src/components/Logistics/Logistics";
import LogisticsDetail from "src/components/Logistics/LogisticsDetail";
import { CollegeCorrection } from "src/components/DataCorrection/CollegeCorrection";
import RegionList from "src/components/Regions/RegionList";
import CityList from "src/components/City/CityList";
import StateList from "src/components/State/StateList";
import SellerList from "src/components/SalesMeta/SellerList";
import CashManagement from "src/components/FinancialApproval/CashManagement";
import VPA from "src/components/VPA/VPAList";
import Offers from "src/components/Offers/OfferList";
import { CashInHand } from "src/components/CashInHand/cashinhand";
import { TransactionDetails } from "src/components/Transaction/details";
import HomeDashboard from "src/components/HomeSales/HomeDashbaord";
import { AddMore } from "src/components/AddMore/AddMore";
import TransactionHistory from "src/components/Transaction/TransactionHistory";
import Inventory from "src/components/HomeSales/Inventory";
import CouponDetail from "src/components/Offers/CouponDetail";
import RequestRecieved from "src/components/CashInHand/RequestReceived";
import CashRequestReceived from "src/components/AddMore/PaymentSelection/CashRequestReceived/CashRequestReceived";
import { AccomodationCorrection } from "src/components/DataCorrection/AccomodationCorrection";
import { CourseFaqCorrection } from "src/components/DataCorrection/CourseFaqCorrection";
import { CourseAssetCorrection } from "src/components/DataCorrection/CourseAssetCorrection";
import { ContentTypeCorrection } from "src/components/DataCorrection/ContentTypeCorrection";
import { CategoryCorrection } from "src/components/DataCorrection/CategoryCorrection";
import { SectionContentCorrection } from "src/components/DataCorrection/SectionContentCorrection";
import { CourseSectionCorrection } from "src/components/DataCorrection/CourseSectionCorrection";
import { CourseDetailsCorrection } from "src/components/DataCorrection/CourseDetailsCorrection";
import CardAllocationList from "src/components/CardAllocation/CardAllocationList";
import MasterTransactionDetail from "src/components/FinancialApproval/MasterTransactionDetail";
import { DisciplineCorrection } from "src/components/DataCorrection/DisciplineCorrection";
import { AcademicCorrection } from "src/components/DataCorrection/AcademicCorrection";
import { ProgramCorrection } from "src/components/DataCorrection/ProgramCorrection";
import { AccreditationCorrection } from "src/components/DataCorrection/AccreditationMapperCorrection";
import { EntityCampusCorrection } from "src/components/DataCorrection/EntityCampusCorrection";
import { RankingMapperCorrection } from "src/components/DataCorrection/RankingMapperCorrection";
import { CollegeEventCorrection } from "src/components/DataCorrection/CollegeEventCorrection";
import { ExamTypeCorrection } from "src/components/DataCorrection/ExamTypeCorrection";
import { MasterOccupationCorrection } from "src/components/DataCorrection/MasterOccupationCorrection";
import { RankCorrection } from "src/components/DataCorrection/RankCorrection";
import { MasterDegreeCorrection } from "src/components/DataCorrection/MasterDegreeCorrection";
import { EntityCoursesCorrection } from "src/components/DataCorrection/EntityCoursesCorrection";
import { EventTypeCorrection } from "src/components/DataCorrection/EventTypeCorrection";
import { MasterCityCorrection } from "src/components/DataCorrection/MasterCityCorrection";
import { AccrediationMasterCorrection } from "src/components/DataCorrection/AccrediationMasterCorrection";
import { AffiliationMasterCorrection } from "src/components/DataCorrection/AffiliationMasterCorrection";
import { SubjectMasterCorrection } from "src/components/DataCorrection/SubjectMasterCorrection";
import { TaskstmtMasterCorrection } from "src/components/DataCorrection/TaskstmtMasterCorrection";
import { EmploymentStatusMasterCorrection } from "src/components/DataCorrection/EmploymentStatusMasterCorrection";
import { CourseEligibilityMasterCorrection } from "src/components/DataCorrection/CourseEligibilityMasterCorrection";
import { CourseExaminationCorrection } from "src/components/DataCorrection/CourseExaminationCorrection";
import { StreamMasterCorrection } from "src/components/DataCorrection/StreamMasterCorrection";
import { CareerCourseLevelCorrection } from "src/components/DataCorrection/CareerCourseLevelMasterCorrection";
import { CourseTypeCorrection } from "src/components/DataCorrection/CourseTypeMasterCorrection";
import { CourseMasterCorrection } from "src/components/DataCorrection/CourseMasterCorrection";
import { EmploymentStatusCorrection } from "src/components/DataCorrection/OccupEmploymentStatusCorrection";
import { OccupationExamCorrection } from "src/components/DataCorrection/OccupationExamCorrection";
import { OccupationExpensesCorrection } from "src/components/DataCorrection/OccupationExpensesCorrection";
import { AccomodationTypeCorrection } from "src/components/DataCorrection/AccomodationTypeCorrection";
import { CollegeEventDatesCorrection } from "src/components/DataCorrection/CollegeEventDatesCorrection";
import { EntityMasterCoursesCorrection } from "src/components/DataCorrection/EntityMasterCorrection";
import { OccupationCourseCorrection } from "src/components/DataCorrection/OccupationCourseCorrection";
import { RMOBenchmarkhourCorrection } from "src/components/DataCorrection/RMOBenchmarkhourCorrection";
import { RMOProgressionCorrection } from "src/components/DataCorrection/RMOProgressionCorrection";
import { MasterExaminationCorrection } from "src/components/DataCorrection/MasterExaminationCorrection";
import { RegionalOccupationMetaCorrection } from "src/components/DataCorrection/RegionalOccupationMetaCorrection";
import { RMOStudyRoutePathCorrection } from "src/components/DataCorrection/RMOStudyRoutePathCorrection";
import { RMOStudyRouteCorrection } from "src/components/DataCorrection/RMOStudyRouteCorrection";
import { OccupationQualificationCorrection } from "src/components/DataCorrection/OccupationQualificationCorrection";
import { RMOccupationCorrection } from "src/components/DataCorrection/RMOccupationCorrection";
import { OccupationSalaryCorrection } from "src/components/DataCorrection/OccupationSalaryCorrection";
import { PublisherDetailsCorrection } from "src/components/DataCorrection/PublisherDetailsCorrection";
import OfflineSalesList from "src/components/OfflineSubscriptionSale/OfflineSalesList";
import { GlobalMasterCountryCorrection } from "src/components/DataCorrection/GlobalMasterCountryCorrection";
import { MasterStateCorrection } from "src/components/DataCorrection/MasterStateCorrection";
import { BannerSectionCorrection } from "src/components/DataCorrection/BannerSectionCorrection";
import { ServicesCorrection } from "src/components/DataCorrection/ServicesCorrection";
import { BlogsVideoCorrection } from "src/components/DataCorrection/BlogsVideosCorrection";
import { TestimonialCorrection } from "src/components/DataCorrection/TestimonialCorrection";
import { ApisList } from "src/components/RouteMaster/ApisList";

const routes = (isAuthenticated: boolean, route) => [
  {
    path: "/",
    element: !isAuthenticated ? <HomeLayout /> : <Navigate to={`/${route}`} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "logout",
    element: <Navigate to="/" />,
  },
  {
    path: "callback",
    element: <Navigate to={`/${route}`} />,
  },
  {
    path: "",
    element: isAuthenticated ? <AdminLayout /> : <Navigate to="/" />,
    children: [
      {
        path: "home",
        id: "1",
        element: <Navigate to={`/${route}`} />,
      },
      {
        path: "counselling-dashboard",
        id: "1",
        element: <DashboardStatusData />,
      },
      {
        path: "entity",
        id: "2",
        children: [
          {
            path: "/",
            id: "3",
            element: <EntityList />,
          },
          {
            path: ":id",
            id: "3",
            element: <EntityDetails />,
          },
        ],
      },
      {
        path: "user",
        id: "4",
        children: [
          {
            path: "/",
            id: "5",
            element: <UserIndex />,
          },
          {
            path: "external",
            children: [
              {
                path: ":id",
                id: "5",
                children: [
                  {
                    path: "/",
                    id: "5",
                    element: <ExternalUserDetail />,
                  },
                  {
                    path: "edit",
                    id: "5",
                    element: <ExternalEditUser />,
                  },
                ],
              },
            ],
          },
          {
            path: ":id",
            children: [
              {
                path: "/",
                id: "5",
                element: <UserDetail />,
              },
              {
                path: "edit",
                id: "5",
                element: <InternalEditUser />,
              },
            ],
          },
        ],
      },
      {
        path: "premiumuser",
        id: "6",
        element: <PremiumUser />
      },
      {
        path: "DetailScreen",
        id: "8",
        children: [
          {
            path: ":id",
            id: "8",
            element: <DetailScreen />,
          },
        ],
      },
      {
        path: "counsellor-application-list",
        id: "8",
        children: [
          {
            path: "/",
            id: "8",
            element: <CounsellorApplicationList />,
          },
        ],
      },
      {
        path: "seo-tag",
        id: "18",
        children: [
          {
            path: "/",
            id: "18",
            element: <SeoTagList />,
          },
        ],
      },
      {
        path: "counsellors",
        id: "9",
        children: [
          {
            path: "/",
            id: "9",
            element: <Counsellor />,
          },
        ],
      },
      {
        path: "details",
        id: "9",
        children: [
          {
            path: ":id",
            id: "9",
            element: <CounsellorDetails />,
          },
        ],
      },
      {
        path: "CounselorOccupancy",
        id: "11",
        element: <Occupancy />,
      },
      {
        path: "interviewers",
        id: "17",
        element: <InterviewerList />
      },
      {
        path: "ItemListing",
        id: "16",
        element: <ItemsList />
      },
      {
        path: "user-role",
        id: "21",
        element: <RoleListActions />
      },
      {
        path: "api-master",
        id: "100",
        element: <ApisList />
      },
      {
        path: "region",
        id: "25",
        element: <RegionList />
      },
      {
        path: "vpa",
        id: "27",
        element: <VPA />
      },
      {
        path: "offers",
        id: "28",
        children: [
          {
            path: "/",
            id: "28",
            element: <Offers />,
          },
          {
            path: ":id",
            id: "28",
            element: <CouponDetail />,
          },
        ],
      },
      {
        path: "states",
        id: "40",
        element: <StateList />
      },
      {
        path: "sales-meta",
        id: "41",
        element: <SellerList />
      },
      {
        path: "card-allocation",
        id: "51",
        element: <CardAllocationList />
      },
      {
        path: "offline-sale",
        id: "100",
        element: <OfflineSalesList />
      },
      {
        path: "SessionSlotsOverride",
        id: "13",
        element: <SessionSlotsOverride />
      },
      {
        path: "Availability",
        id: "14",
        element: <Availability />
      },
      {
        path: "sessions",
        id: "10",
        element: <Sessions />
      },
      {
        path: "SessionsDetail",
        id: "10",
        children: [
          {
            path: ":id",
            id: "10",
            element: <SessionsDetail />,
          },
        ],
      },
      {
        path: "orders",
        id: "19",
        children: [
          {
            path: "/learning-hub",
            id: "20",
            element: <Orders />
          },
          {
            path: ":id",
            id: "20",
            element: <OrderDetail />,
          },
        ]
      },
      {
        path: "Logistic",
        id: "22",
        children: [
          {
            path: "/",
            id: "22",
            element: <Logistics />,
          },
          {
            path: ":id",
            id: "22",
            element: <LogisticsDetail />,
          },
        ]
      },
      {
        path: "financial-approval",
        id: "52",
        children: [
          {
            path: "/",
            id: "52",
            element: <CashManagement />,
          },
          {
            path: ":id",
            id: "52",
            element: <MasterTransactionDetail />,
          },
        ],
      },
      {
        path: "ranking-org",
        id: "24",
        element: <RankCorrection />,
      },
      {
        path: "affiliation",
        id: "59",
        element: <AffiliationMasterCorrection />,
      },
      {
        path: "city",
        id: "26",
        element: <CityList />
      },
      {
        path: "degree",
        id: "63",
        element: <MasterDegreeCorrection />,
      },
      {
        path: "subject",
        id: "65",
        element: <SubjectMasterCorrection />,
      },
      {
        path: "stream",
        id: "64",
        element: <StreamMasterCorrection />,
      },
      {
        path: "task-stmt",
        id: "66",
        element: <TaskstmtMasterCorrection />,
      },
      {
        path: "employment-status",
        id: "67",
        element: <EmploymentStatusMasterCorrection />,
      },
      {
        path: "course-eligibility",
        id: "73",
        element: <CourseEligibilityMasterCorrection />,
      },
      {
        path: "entity-master",
        id: "78",
        element: <EntityMasterCoursesCorrection />,
      },
      {
        path: "course-examination",
        id: "74",
        element: <CourseExaminationCorrection />,
      },
      {
        path: "discipline",
        id: "29",
        element: <DisciplineCorrection />,
      },
      {
        path: "academic",
        id: "30",
        element: <AcademicCorrection />,
      },
      {
        path: "program",
        id: "31",
        element: <ProgramCorrection />,
      },
      {
        path: "accomodation",
        id: "37",
        element: <AccomodationCorrection />,
      },
      {
        path: "accrediation",
        id: "59",
        element: <AccrediationMasterCorrection />,
      },
      {
        path: "category",
        id: "43",
        element: <CategoryCorrection />,
      },
      {
        path: "college",
        id: "68",
        element: <CollegeCorrection />,
      },
      {
        path: "city-master",
        id: "61",
        element: <MasterCityCorrection />,
      },
      // SubjectMasterCorrection
      // {
      //   path: "college-master",
      //   id: "23",
      //   element: <CollageEventCorrection />,
      // },
      {
        path: "accomodation",
        id: "23",
        element: <AccomodationCorrection />,
      },
      {
        path: "accomodationmapper",
        id: "97",
        element: <AccomodationCorrection />,
      },
      {
        path: "course-master",
        id: "75",
        element: <CourseMasterCorrection />
      },
      {
        path: "courselevel-master",
        id: "76",
        element: <CareerCourseLevelCorrection />
      },
      {
        path: "coursetype-master",
        id: "77",
        element: <CourseTypeCorrection />
      },
      {
        path: "collegeevent-dates",
        id: "70",
        element: <CollegeEventDatesCorrection />
      },
      {
        path: "examstype-master",
        id: "83",
        element: <ExamTypeCorrection />
      },
      {
        path: "course-faq",
        id: "38",
        element: <CourseFaqCorrection />,
      },
      {
        path: "course-asset",
        id: "39",
        element: <CourseAssetCorrection />,
      },
      {
        path: "contenttype",
        id: "42",
        element: <ContentTypeCorrection />,
      },

      {
        path: "section-content",
        id: "44",
        element: <SectionContentCorrection />,
      },
      {
        path: "course-section",
        id: "45",
        element: <CourseSectionCorrection />,
      },
      {
        path: "course-details",
        id: "46",
        element: <CourseDetailsCorrection />,
      },
      {
        path: "occupation-qualification",
        id: "94",
        element: <OccupationQualificationCorrection />,
      },
      {
        path: "cash-in-hand",
        id: "34",
        element: <CashInHand />,
      },
      {
        path: "transaction",
        id: "34",
        children: [
          {
            path: ":id",
            id: "34",
            element: <TransactionDetails />,
          },
        ],
      },
      {
        path: "home-sales",
        id: "33",
        element: <HomeDashboard />,
      },
      {
        path: "home-sales/inventory",
        id: "33",
        element: <Inventory />,
      },
      {
        path: "add-more",
        id: "36",
        element: <AddMore />,
      },
      {
        path: "add-more/request-received",
        id: "36",
        element: <CashRequestReceived />
      },
      {
        path: "history-sales",
        id: "35",
        element: <TransactionHistory />
      },
      {
        path: "discipline",
        id: "29",
        element: <DisciplineCorrection />,
      },
      {
        path: "academic",
        id: "30",
        element: <AcademicCorrection />,
      },
      {
        path: "program",
        id: "31",
        element: <ProgramCorrection />,
      },
      {
        path: "accomodation-type",
        id: "50",
        element: <AccomodationTypeCorrection />,
      },
      {
        path: "college-event",
        id: "69",
        element: <CollegeEventCorrection />,
      },
      {
        path: "accreditationmapper",
        id: "80",
        element: <AccreditationCorrection />,
      },
      {
        path: "campus-entity",
        id: "81",
        element: <EntityCampusCorrection />,
      },
      {
        path: "rankingmapper-entity",
        id: "82",
        element: <RankingMapperCorrection />,
      },
      {
        path: "occupation-meta",
        id: "92",
        element: <RegionalOccupationMetaCorrection />,
      },
      {
        path: "country",
        id: "99",
        element: <GlobalMasterCountryCorrection />,
      },
      {
        path: "occupation-studyroutepath",
        id: "97",
        element: <RMOStudyRoutePathCorrection />,
      },
      {
        path: "occupation-course",
        id: "89",
        element: <OccupationCourseCorrection />,
      },
      {
        path: "occupation-studyroute",
        id: "96",
        element: <RMOStudyRouteCorrection />,
      },
      {
        path: "entity-courses",
        id: "72",
        element: <EntityCoursesCorrection />,
      },
      {
        path: "eventtype",
        id: "71",
        element: <EventTypeCorrection />,
      },
      {
        path: "occupation-employmentstatus",
        id: "85",
        element: <EmploymentStatusCorrection />,
      },
      {
        path: "occupation-master",
        id: "86",
        element: <MasterOccupationCorrection />,
      },
      {
        path: "occupation-benchmarkhour",
        id: "88",
        element: <RMOBenchmarkhourCorrection />,
      },
      {
        path: "occupation-exam",
        id: "90",
        element: <OccupationExamCorrection />,
      },
      {
        path: "occupation-expenses",
        id: "91",
        element: <OccupationExpensesCorrection />,
      },
      {
        path: "occupation-progression",
        id: "93",
        element: <RMOProgressionCorrection />,
      },
      {
        path: "regional-occupation",
        id: "87",
        element: <RMOccupationCorrection />,
      },
      {
        path: "publisher-master",
        id: "37",
        element: <PublisherDetailsCorrection />,
      },
      {
        path: "*",
        element: <ErrorNotFound />
      },
      {
        path: "occupation-salary",
        id: "95",
        element: <OccupationSalaryCorrection />,
      },
      {
        path: "state",
        id: "98",
        element: <MasterStateCorrection />,
      },
      {
        path: "occupation-qualification",
        id: "94",
        element: <OccupationQualificationCorrection />,
      },
      {
        path: "examination-master",
        id: "83",
        element: <MasterExaminationCorrection />,
      },
      {
        path: "sectioncontent",
        id: "101",
        element: <BannerSectionCorrection />,
      },
      {
        path: "services",
        id: "102",
        element: <ServicesCorrection />,
      },
      {
        path: "blogs-videos",
        id: "104",
        element: <BlogsVideoCorrection />,
      },
      {
        path: "testimonial",
        id: "103",
        element: <TestimonialCorrection />,
      },
    ],
  }
];

export default routes;