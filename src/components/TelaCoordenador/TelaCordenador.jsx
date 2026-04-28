import MenuLateral from "../MenuLateral/MenuLateral";
import TabelaCoordenador from "../TabelaCoordenador/TabelaCoordenador";
import style from "./estilo.module.css";

export default function TelaCoordenador() {
  return (
    <div className={style.conteiner}>
      <MenuLateral pagina="Coordenadores" />
      <main className={style.conteudoPrincipal}>
        <TabelaCoordenador />
      </main>
    </div>
  );
}
