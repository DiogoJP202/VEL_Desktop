import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

// 1- configurando router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "./components/RequireAuth.jsx";
import RequireRole from "./components/RequireRole.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import ToastViewport from "./components/ToastViewport.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AUTH_ROLE } from "./services/auth";

const THEME_STORAGE_KEY = "vel:settings:v1";

if (typeof window !== "undefined") {
  try {
    const rawTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const parsedTheme = rawTheme ? JSON.parse(rawTheme) : null;
    const isDarkMode = Boolean(parsedTheme?.darkMode);
    document.body.classList.toggle("vel-dark-mode", isDarkMode);
  } catch {
    document.body.classList.remove("vel-dark-mode");
  }
}

const PaginaInicial = lazy(() => import("./Paginas/PaginaInicial/App.jsx"));
const Pagamento = lazy(() => import("./Paginas/PaginaPagamento/app.jsx"));
const Sobrenos = lazy(() => import("./Paginas/PaginaSobre/App.jsx"));
const Sobrenosen = lazy(() => import("./Paginas/PaginaSobreEn/App.jsx"));
const Login = lazy(() => import("./Paginas/PaginaLogin/app.jsx"));
const Dashboard = lazy(() => import("./Paginas/Dashboard/app.jsx"));
const RecuperarSenha = lazy(() => import("./Paginas/RecuperarSenha/App.jsx"));
const CodigoValidacao = lazy(() => import("./Paginas/CodigoValidacao/App.jsx"));
const TelaAtendente = lazy(() => import("./Paginas/TelaAtendente/app.jsx"));
const AtribuirEntrega = lazy(() => import("./Paginas/AtribuirEntrega/app.jsx"));
const Configuracao = lazy(() => import("./Paginas/PaginaConfiguracoes/app.jsx"));
const Pagamentos = lazy(() => import("./Paginas/Pagamentos/app.jsx"));
const Entregadores = lazy(() => import("./Paginas/TelaEntregador/app.jsx"));
const Faturamento = lazy(() => import("./Paginas/Faturamento/app.jsx"));
const ContratoEntregador = lazy(() => import("./Paginas/PaginaContratosEntregador/app.jsx"));
const ContratoEmpregador = lazy(() => import("./Paginas/PaginaContratosEmpresa/app.jsx"));
const Coordenador = lazy(() => import("./Paginas/TelaCoordenador/app.jsx"));
const PerfilEmpresa = lazy(() => import("./Paginas/PaginaPerfilEmpresa/app.jsx"));
const EditarPerfilEmpresa = lazy(() => import("./Paginas/PaginaEditarPerfilEmpresa/app.jsx"));
const NotFound = lazy(() => import("./Paginas/NotFound/app.jsx"));
const PaginaLegal = lazy(() => import("./Paginas/PaginaLegal/App.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastViewport />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/inicial" element={<PaginaInicial />} />
            <Route path="/Inicial" element={<Navigate to="/inicial" replace />} />
            <Route path="/inicialingles" element={<PaginaInicial />} />
            <Route path="/InicialIngles" element={<Navigate to="/inicialingles" replace />} />
            <Route path="/termos" element={<PaginaLegal />} />
            <Route path="/Termos" element={<Navigate to="/termos" replace />} />
            <Route path="/privacidade" element={<PaginaLegal />} />
            <Route path="/Privacidade" element={<Navigate to="/privacidade" replace />} />
            <Route path="/terms" element={<PaginaLegal />} />
            <Route path="/Terms" element={<Navigate to="/terms" replace />} />
            <Route path="/privacy" element={<PaginaLegal />} />
            <Route path="/Privacy" element={<Navigate to="/privacy" replace />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/Pagamento" element={<Navigate to="/pagamento" replace />} />
            <Route path="/pagamentoingles" element={<Pagamento />} />
            <Route path="/PagamentoIngles" element={<Navigate to="/pagamentoingles" replace />} />
            <Route path="/sobrenos" element={<Sobrenos />} />
            <Route path="/SobreNos" element={<Navigate to="/sobrenos" replace />} />
            <Route path="/sobrenosen" element={<Sobrenosen />} />
            <Route path="/SobreNosEn" element={<Navigate to="/sobrenosen" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Login" element={<Navigate to="/login" replace />} />
            <Route path="/loginingles" element={<Login />} />
            <Route path="/Loginingles" element={<Navigate to="/loginingles" replace />} />
            <Route path="/dashboard" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><Dashboard /></RequireRole></RequireAuth>} />
            <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="/recuperarsenha" element={<RecuperarSenha />} />
            <Route path="/RecuperarSenha" element={<Navigate to="/recuperarsenha" replace />} />
            <Route path="/recuperarsenhaingles" element={<RecuperarSenha />} />
            <Route path="/RecuperarSenhaIngles" element={<Navigate to="/recuperarsenhaingles" replace />} />
            <Route path="/codigovalidacao" element={<CodigoValidacao />} />
            <Route path="/CodigoValidacao" element={<Navigate to="/codigovalidacao" replace />} />
            <Route path="/atendente" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.ATTENDANT]} fallbackPath="/dashboard"><TelaAtendente /></RequireRole></RequireAuth>} />
            <Route path="/Atendente" element={<Navigate to="/atendente" replace />} />
            <Route path="/atribuirentrega" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.ATTENDANT]} fallbackPath="/dashboard"><AtribuirEntrega /></RequireRole></RequireAuth>} />
            <Route path="/AtribuirEntrega" element={<Navigate to="/atribuirentrega" replace />} />
            <Route path="/pagamentos" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><Pagamentos /></RequireRole></RequireAuth>} />
            <Route path="/Pagamentos" element={<Navigate to="/pagamentos" replace />} />
            <Route path="/entregadores" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><Entregadores /></RequireRole></RequireAuth>} />
            <Route path="/Entregadores" element={<Navigate to="/entregadores" replace />} />
            <Route path="/faturamento" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><Faturamento /></RequireRole></RequireAuth>} />
            <Route path="/Faturamento" element={<Navigate to="/faturamento" replace />} />
            <Route path="/configuracao" element={<RequireAuth><Configuracao /></RequireAuth>} />
            <Route path="/Configuracao" element={<Navigate to="/configuracao" replace />} />
            <Route path="/contratoentregador" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.ATTENDANT, AUTH_ROLE.OWNER]} fallbackPath="/dashboard"><ContratoEntregador /></RequireRole></RequireAuth>} />
            <Route path="/ContratoEntregador" element={<Navigate to="/contratoentregador" replace />} />
            <Route path="/contratoempregador" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><ContratoEmpregador /></RequireRole></RequireAuth>} />
            <Route path="/ContratoEmpregador" element={<Navigate to="/contratoempregador" replace />} />
            <Route path="/coordenador" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><Coordenador /></RequireRole></RequireAuth>} />
            <Route path="/Coordenador" element={<Navigate to="/coordenador" replace />} />
            <Route path="/perfilempresa" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><PerfilEmpresa /></RequireRole></RequireAuth>} />
            <Route path="/PerfilEmpresa" element={<Navigate to="/perfilempresa" replace />} />
            <Route path="/editarperfilempresa" element={<RequireAuth><RequireRole allowedRoles={[AUTH_ROLE.OWNER]} fallbackPath="/atendente"><EditarPerfilEmpresa /></RequireRole></RequireAuth>} />
            <Route path="/EditarPerfilEmpresa" element={<Navigate to="/editarperfilempresa" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
