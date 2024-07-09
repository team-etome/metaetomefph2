import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import GodloginPage from './pages/godpage/GodloginPage'
import GoddashboardPage from './pages/godpage/GoddashboardPage'
import GodHeader from './components/god/godheader/GodHeader';
import AdminForgot from './components/admin/adminforgotpassword/AdminForgot';
import AdminNewPassword from './components/admin/adminnewpassword/AdminNewPassword';
import Header from './components/menus/header/Header';
import Sidebar from './components/menus/sidebar/Sidebar';
import AdminDashboardpage from './pages/adminpage/AdminDashboardpage';
import AddtextbooksPage from './pages/godpage/AddtextbooksPage';
import AddcustomerPage from './pages/godpage/AddcustomerPage';
import ViewinstitutionPage from './pages/godpage/ViewinstitutionPage';
import BookdashboardPage from './pages/godpage/BookdashboardPage';
import CustomerdashboardPage from './pages/godpage/CustomerdashboardPage';
import CoursedashboardPage from './pages/godpage/CoursedashboardPage';
import SchoolPage from './pages/godpage/SchoolPage';
import AdminLoginPage from './pages/adminpage/AdminLoginPage';
import AdminFacultyPage from './pages/adminpage/AdminFacultyPage';
import AdminClassPage from './pages/adminpage/AdminClassPage';
import InstitutionAddingPage from './pages/adminpage/InstitutionAddingPage';
import AdminClassAddingPage from './pages/adminpage/AdminClassAddingPage';
import AdminCurriculumAddingPage from './pages/adminpage/AdminCurriculumAddingPage';
import AdminFacultyAddingPage from './pages/adminpage/AdminFacultyAddingPage';
import AdminClassViewPage from './pages/adminpage/AdminClassViewPage';
import AdminFacultyViewPage from './pages/adminpage/AdminFacultyViewPage';
import AdminStudentListPage from './pages/adminpage/AdminStudentListPage';
import AdminStudentViewPage from './pages/adminpage/AdminStudentViewPage';
import AdminStudentResultPage from './pages/adminpage/AdminStudentResultPage';
import AarnaNavbarPage from './pages/adminpage/AarnaNavbarPage';
import AarnaProgressPage from './pages/adminpage/AarnaProgressPage';
import AarnaQuestionPaperPage from './pages/adminpage/AarnaQuestionPaperPage';
import AarnaQuestionAssigningPage from './pages/adminpage/AarnaQuestionAssigningPage';
import AarnaSeatingDashboardPage from './pages/adminpage/AarnaSeatingDashboardPage';
import AarnaSeatAssignPage from './pages/adminpage/AarnaSeatAssignPage';
import AarnaEvaluationSchedulePage from './pages/adminpage/AarnaEvaluationSchedulePage';
import AarnaEvaluationDashbaordPage from './pages/adminpage/AarnaEvaluationDashbaordPage';
import AarnaQuestionViewPage from './pages/adminpage/AarnaQuestionViewPage';
import AarnaSeatViewPage from './pages/adminpage/AarnaSeatViewPage';
import AarnaEvaluationViewPage from './pages/adminpage/AarnaEvaluationViewPage';
import TeacherStudentAddPage from './pages/teacherpage/TeacherStudentAddPage';
// import TeacherNavbarPage from './pages/teacherpage/TeacherNavbarPage';
import TeacherStudentViewPage from './pages/teacherpage/TeacherStudentViewPage';
import TeacherLoginPage from './pages/teacherpage/TeacherLoginPage';
import AdminLokaTextbookPage from './pages/adminpage/AdminLokaTextbookPage';
import TeacherTextEditorPage from './pages/teacherpage/TeacherTextEditorPage';
import LokaNavbarPage from './pages/adminpage/LokaNavbarPage';
import TeacherAarnaPage from './pages/teacherpage/TeacherAarnaPage';
import TeacherQuestionCreationPage from './pages/teacherpage/TeacherQuestionCreationPage';
import AarnaResultViewPage from './pages/adminpage/AarnaResultViewPage';
import TeacherResultView from './components/teacher/teacherresultview/TeacherResultView';
import AdminLokaLibraryPage from './pages/adminpage/AdminLokaLibraryPage';
import TeacherQuestionInstructionPage from './pages/teacherpage/TeacherQuestionInstructionPage';
import TeacherQuestionGeneratorPage from './pages/teacherpage/TeacherQuestionGeneratorPage';
import TeacherStudentDashboardPage from './pages/teacherpage/TeacherStudentDashboardPage';
import TeacherExaminationListPage from './pages/teacherpage/TeacherExaminationListPage';
import TeacherSubjectPage from './pages/teacherpage/TeacherSubjectPage';
import TeacherClassViewPage from './pages/teacherpage/TeacherClassViewPage';
import TeacherAssignmentListPage from './pages/teacherpage/TeacherAssignmentListPage';
import TeacherAssignmentAddPage from './pages/teacherpage/TeacherAssignmentAddPage';
import TeacherRefrenceListPage from './pages/teacherpage/TeacherRefrenceListPage';
import TeacherRefernceAddPage from './pages/teacherpage/TeacherRefernceAddPage';
import TeacherTestListPage from './pages/teacherpage/TeacherTestListPage';
import TeacherTestAddPage from './pages/teacherpage/TeacherTestAddPage';
import TeacherHomePage from './pages/teacherpage/TeacherHomePage';
import AssignmentEditor from './components/teacher/teacherassignmentadd/AssignmentEditor';
import AdminProfilePage from './pages/adminpage/AdminProfilePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* godside */}
          <Route path="/godlogin" element={<GodloginPage />} />
          <Route path="/goddashboard" element={<GoddashboardPage />} />
          <Route path="/addcustomer" element={<AddcustomerPage />} />
          <Route path="/addbooks" element={<AddtextbooksPage />} />
          <Route path="/addbooks/:id" element={<AddtextbooksPage />} />
          <Route path="/viewinstitution/:id" element={<ViewinstitutionPage />}/>
          <Route path="/textbookdashboard" element={<BookdashboardPage />} />
          <Route path="/GodHeader" element={<GodHeader />} />
          <Route path="/customerdashboard" element={<CustomerdashboardPage />}/>
          <Route path="/coursedashboard" element={<CoursedashboardPage />} />
          <Route path="/school" element={<SchoolPage />} />

          
          {/* adminside */}
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/admindashboard" element={<AdminDashboardpage />} />
          <Route path="/institutionadding" element={<InstitutionAddingPage />}/>
          <Route path="/classadding" element={<AdminClassAddingPage/>}/>
          <Route path="/adminforgot" element={<AdminForgot />} />
          <Route path="/adminnewpassword" element={<AdminNewPassword />} />
          <Route path="/adminfacultydashboard" element={<AdminFacultyPage />} />
          <Route path="/curriculumadding" element={<AdminCurriculumAddingPage/>}/>
          <Route path="/facultyadding" element={<AdminFacultyAddingPage/>}/>
          <Route path="/classview" element={<AdminClassViewPage/>}/>
          <Route path="/facultyview" element={<AdminFacultyViewPage/>}/>
          <Route path="/studentlist" element={<AdminStudentListPage/>}/>
          <Route path="/studentview" element={<AdminStudentViewPage/>}/>
          <Route path="/studentresultview" element={<AdminStudentResultPage/>}/>
          <Route path="/aarnanavbar" element={<AarnaNavbarPage/>}/>
          <Route path="/aarnaprogress" element={<AarnaProgressPage/>}/>
          <Route path="/aarnaquestionpaper" element={<AarnaQuestionPaperPage/>}/>
          <Route path="/questionadding" element={<AarnaQuestionAssigningPage/>}/>
          <Route path="/seatingdashboard" element={<AarnaSeatingDashboardPage/>}/>
          <Route path="/seatassigning" element={<AarnaSeatAssignPage/>}/>
          <Route path="/evaluationscheduling" element={<AarnaEvaluationSchedulePage/>}/>
          <Route path="/evaluationdashboard" element={<AarnaEvaluationDashbaordPage/>}/>
          <Route path="/questionview" element={<AarnaQuestionViewPage/>}/>
          <Route path="/seatview" element={<AarnaSeatViewPage/>}/>
          <Route path="/evaluationview" element={<AarnaEvaluationViewPage/>}/>
          <Route path="/adminlokanavbar" element={<LokaNavbarPage/>}/>
          <Route path="/adminlokatextbook" element={<AdminLokaTextbookPage/>}/>
          <Route path="/adminlokalibary" element={<AdminLokaLibraryPage/>}/>
          <Route path="/adminresultview" element={<AarnaResultViewPage/>}/>
          <Route path="/adminprofile" element={<AdminProfilePage/>}/>







          {/* teacherside */}
          <Route path="/teacherlogin" element={<TeacherLoginPage/>}/>
          {/* <Route path="/teachernavbar" element={<TeacherNavbarPage/>}/> */}
          <Route path="/teacherhome" element={<TeacherHomePage/>}/>
          <Route path="/teacherstudentadd" element={<TeacherStudentAddPage/>}/>
          <Route path="/teacherstudentdashboard" element={<TeacherStudentDashboardPage/>}/>
          <Route path="/teacherstudentview" element={<TeacherStudentViewPage/>}/>
          <Route path="/teachertexteditor" element={<TeacherTextEditorPage/>}/>
          {/* <Route path="/teacheraarna" element={<TeacherAarnaPage/>}/> */}
          <Route path="/teacherquestionview" element={<TeacherQuestionCreationPage/>}/>
          <Route path="/teacherresultview" element={<TeacherResultView/>}/>
          <Route path="/teacherquestioninstruction" element={<TeacherQuestionInstructionPage/>}/>
          <Route path="/teacherquestiongenerator" element={<TeacherQuestionGeneratorPage/>}/>
          <Route path="/teacherexamination" element={<TeacherExaminationListPage/>}/>
          <Route path="/teachersubject" element={<TeacherSubjectPage/>}/>
          <Route path="/teacherclassview" element={<TeacherClassViewPage/>}/>
          <Route path="/teacherassignment" element={<TeacherAssignmentListPage/>}/>
          <Route path="/teacherassignmentadding" element={<TeacherAssignmentAddPage/>}/>
          <Route path="/teacherassignmenteditor" element={<AssignmentEditor/>}/>
          <Route path="/teacherrefrencelist" element={<TeacherRefrenceListPage/>}/>
          <Route path="/teacherreferenceadd" element={<TeacherRefernceAddPage/>}/>
          <Route path="/teachertestlist" element={<TeacherTestListPage/>}/>
          <Route path="/teachertestadd" element={<TeacherTestAddPage/>}/>





          {/* menu */}
          <Route path="/header" element={<Header />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;