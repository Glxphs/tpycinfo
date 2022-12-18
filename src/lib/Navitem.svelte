<script>
  import { page } from "$app/stores"
  export let href
  $: active = $page.url.pathname === href
</script>

<li class="nav-item">
  <a class="nav-link" class:active aria-current="page" {href}>
    <slot />
  </a>
</li>