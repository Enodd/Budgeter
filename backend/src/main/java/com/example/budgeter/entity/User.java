package com.example.budgeter.entity;

import com.example.budgeter.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 40)
    @NotNull
    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Size(max = 40)
    @NotNull
    @Column(name = "mail", nullable = false, length = 40)
    private String mail;

    @Size(max = 40)
    @NotNull
    @Column(name = "password", nullable = false, length = 40)
    private String password;

    @Size(max = 40)
    @Column(name = "nickname", length = 40)
    private String nickname;

    @NotNull
    @Column(name = "dateofbirth", nullable = false)
    private LocalDate dateofbirth;

    @Size(max = 255)
    @NotNull
    @ColumnDefault("'USER'")
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "refreshtoken", length = Integer.MAX_VALUE)
    private String refreshtoken;

    @Column(name = "refreshtokenexpirydate")
    private LocalDateTime refreshtokenexpirydate;

    @OneToMany
    @JoinColumn(name = "id_user")
    private Set<Budget> budgets = new LinkedHashSet<>();

    @OneToMany
    @JoinColumn(name = "user_id")
    private Set<FinancialGoal> financialGoals = new LinkedHashSet<>();

}