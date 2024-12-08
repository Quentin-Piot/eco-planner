import { Card, CardRootProps } from "@chakra-ui/react";
import * as React from "react";
import { ReactNode } from "react";


export interface GlassCardProps extends CardRootProps {
  footer?: ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(props, ref) {

    const { children, title, footer, ...rest } = props;
    return (
      <Card.Root ref={ref}  {...rest} background="rgba(255, 255, 255, 0.8)"
                 borderRadius="16px"
                 boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                 backdropFilter="blur(5px)"
                 border="1px solid rgba(255, 255, 255, 0.3)"
                 py={2}>
        <Card.Body>
          <Card.Title textAlign="center" fontWeight={500} mb={6}>
            {title}
          </Card.Title>
          {children}
        </Card.Body>
        <Card.Footer justifyContent={"flex-end"} pt={4}>
          {footer}
        </Card.Footer>
      </Card.Root>
    );
  });