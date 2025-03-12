import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { emojiBurstStyles } from '../styles';

interface EmojiBurstProps {
  emoji: string;
  visible: boolean;
  count?: number;
  duration?: number;
  size?: number;
  onAnimationComplete?: () => void;
}

const EmojiBurst: React.FC<EmojiBurstProps> = ({
  emoji,
  visible,
  count = 12,
  duration = 1000, // Duración total más corta (1 segundo)
  size = 20,
  onAnimationComplete
}) => {
  // Referencia para el timeout de limpieza
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Crear array de configuraciones para las partículas
  const particles = useRef(Array(count).fill(0).map((_, i) => {
    // Calcular ángulo para distribución en círculo
    const angle = (Math.PI * 2 * i) / count;
    // Distancia aleatoria
    const distance = 40 + Math.random() * 30;
    // Tiempo de retraso aleatorio para movimiento más natural
    const delay = Math.random() * 50; // Retraso menor para inicio más rápido
    
    // Simulación de gravedad - mayor para partículas en el hemisferio superior
    const gravity = angle > 0 && angle < Math.PI ? 1.5 + Math.random() * 0.5 : 0.8 + Math.random() * 0.4;
    
    return {
      id: i,
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      scale: new Animated.Value(0.5),
      opacity: new Animated.Value(0),
      rotation: new Animated.Value(0),
      // Propiedades de la partícula
      angle,
      distance,
      delay,
      gravity,
      // Factores aleatorios para diversificar el movimiento
      rotationFactor: Math.random() * 4 - 2, // Entre -2 y 2
      // Para cada partícula, establecer una posición aleatoria para "rebotar"
      bounceFactor: 0.6 + Math.random() * 0.3, // Entre 0.6 y 0.9
    };
  })).current;

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Animar cuando visible cambia a true
  useEffect(() => {
    if (visible) {
      // Limpiar timeout anterior si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Resetear y animar todas las partículas
      const animations: Animated.CompositeAnimation[] = [];
      
      particles.forEach(particle => {
        // Resetear valores
        particle.position.setValue({ x: 0, y: 0 });
        particle.scale.setValue(0.5);
        particle.opacity.setValue(0);
        particle.rotation.setValue(0);
        
        // Calcular posición final basada en ángulo y distancia
        const toX = Math.cos(particle.angle) * particle.distance;
        // Para Y, aplicamos un factor de gravedad que hace que las partículas
        // vayan más hacia abajo (simulando gravedad)
        const toY = Math.sin(particle.angle) * particle.distance * particle.gravity;
        
        // Posición de rebote - un poco más arriba que la posición final
        const bounceY = toY * particle.bounceFactor;
        
        // Animación con efecto de rebote
        const moveAnimation = Animated.sequence([
          // Aparecer y crecer rápidamente
          Animated.parallel([
            Animated.timing(particle.opacity, {
              toValue: 1,
              duration: 80,
              useNativeDriver: true,
              delay: particle.delay,
            }),
            Animated.timing(particle.scale, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
              delay: particle.delay,
            }),
          ]),
          // Movimiento principal - más rápido (60% de la duración)
          Animated.parallel([
            // Movimiento en X (linear)
            Animated.timing(particle.position.x, {
              toValue: toX,
              duration: duration * 0.6,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            // Movimiento en Y con efecto rebote
            Animated.sequence([
              // Primero va hacia su destino principal
              Animated.timing(particle.position.y, {
                toValue: toY,
                duration: duration * 0.6,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              // Luego rebota hacia arriba (solo si la partícula está en la mitad inferior)
              ...(toY > 0 ? [
                Animated.timing(particle.position.y, {
                  toValue: bounceY,
                  duration: duration * 0.15,
                  easing: Easing.in(Easing.quad),
                  useNativeDriver: true,
                })
              ] : []),
              // Finalmente cae de nuevo
              ...(toY > 0 ? [
                Animated.timing(particle.position.y, {
                  toValue: toY,
                  duration: duration * 0.15,
                  easing: Easing.bounce,
                  useNativeDriver: true,
                })
              ] : []),
            ]),
            // Rotación durante el movimiento
            Animated.timing(particle.rotation, {
              toValue: particle.rotationFactor,
              duration: duration * 0.6,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          // Desvanecer al final
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]);
        
        animations.push(moveAnimation);
      });
      
      // Iniciar todas las animaciones con un pequeño retraso entre ellas
      Animated.stagger(15, animations).start();
      
      // Configurar timeout para llamar a onAnimationComplete
      timeoutRef.current = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, duration + 100);
    }
  }, [visible, duration, onAnimationComplete, particles]);

  if (!visible) return null;

  return (
    <View style={emojiBurstStyles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            emojiBurstStyles.particle,
            {
              transform: [
                { translateX: particle.position.x },
                { translateY: particle.position.y },
                { scale: particle.scale },
                {
                  rotate: particle.rotation.interpolate({
                    inputRange: [-2, 2],
                    outputRange: ['-120deg', '120deg'],
                  }),
                },
              ],
              opacity: particle.opacity,
            },
          ]}
        >
          <Text style={[emojiBurstStyles.emoji, { fontSize: size }]}>{emoji}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

export default EmojiBurst;