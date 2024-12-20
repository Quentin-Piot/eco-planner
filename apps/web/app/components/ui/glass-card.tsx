import * as React from "react";
import { ReactNode } from "react";

import { Card, CardRootProps } from "@chakra-ui/react";

export interface GlassCardProps extends CardRootProps {
  footer?: ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(props, ref) {
    const { children, title, footer, ...rest } = props;
    return (
      <Card.Root
        ref={ref}
        {...rest}
        background="rgba(255, 255, 255, 0.6)"
        borderRadius="16px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(5px)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        py={2}
      >
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
  },
);

export interface GlassCardNoChakraProps {
  children: ReactNode;
  footer?: ReactNode;
  title?: string;
}

export const GlassCardNoChakra = ({
  children,
  title,
  footer,
}: GlassCardNoChakraProps) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "1rem",
        fontFamily: "System Font, Verdana",
      }}
    >
      <h3
        style={{ textAlign: "center", fontWeight: 500, marginBottom: "1.5rem" }}
      >
        {title}
      </h3>
      <div>{children}</div>
      {footer && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1rem",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
