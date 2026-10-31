import {
    Modal,
    StyleSheet
} from "react-native";

type OrigenBusqueda = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  visible: boolean;
  origen: OrigenBusqueda;
  onClose: () => void;
};

export function BarraBusqueda({
  visible,
  origen,
  onClose,
}: Props) {

  

   

  return (
    <Modal>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  ContenedorModal: {
    
  },

  PanelBusqueda: {
    
  },

  Contenido: {
    
  },

  Encabezado: {
    
  },

  BotonRegresar: {
    
  },

  Titulo: {
    
  },

  Marca: {
    
  },

  TextoMarca: {
    
  },

  BarraBusqueda: {
    
  },

  CampoBusqueda: {
    
  },
});